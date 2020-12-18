const daysUtil = require('../../utils/addDays');
const dayNameUtil = require ('../../utils/getDayNameFromDate');

const isBetweenOpenHours = (orderWithPreparation, dayMaxHour) => {
    return orderWithPreparation <= dayMaxHour;
}

const getNextDayOpen = (orderDate, storeBussinesHours) => {
    const tomorrow = daysUtil.addDays(orderDate, 1);
    const orderDayName = dayNameUtil.getDayNameFromDate(tomorrow);
    const dayIsOpen = storeBussinesHours[orderDayName][0].isOpen;

    return dayIsOpen ? tomorrow : getNextDayOpen(daysUtil.addDays(tomorrow, 1), storeBussinesHours);
}

const sumStringNumbers = (num1, num2) => {
    const number1 = parseInt(num1);
    const number2 = parseInt(num2);
    const resultInt = number1 + number2;
    const stringResult = addZeroBefore(resultInt.toString(), 1000);
    return stringResult;
}
const addZeroBefore = (number, max) => {
    return (number < max ? '0' : '') + number;
}

const buildDateTime = (orderDate, pickTimeFrom, pickTimeTo) => {
    const orderDateIso = orderDate.toISOString();

    return {
        pickingDate: orderDateIso,
        fromTime: pickTimeFrom,
        toTime: pickTimeTo
    }
}
const calculateShipDate = (storeBussinesHours, preparationTime) => {
    const todayDate = new Date();
    const formattedPreparationTime = preparationTime.substr(0,5).replace(':', '');
    const orderDayName = dayNameUtil.getDayNameFromDate(todayDate);
    const orderHour = addZeroBefore(todayDate.getHours(), 10);
    const orderMinutes = addZeroBefore(todayDate.getMinutes(), 10);
    const orderHourMinutes = `${orderHour}${orderMinutes}`;
    const orderWithPreparation = sumStringNumbers(orderHourMinutes, formattedPreparationTime);
    const shipDayIsOpen = storeBussinesHours[orderDayName][0].isOpen;
    const dayMinHourPreparation =  sumStringNumbers(storeBussinesHours[orderDayName][0].open, formattedPreparationTime);
    const timeFromSameDay = orderWithPreparation < storeBussinesHours[orderDayName][0].open ? dayMinHourPreparation : orderWithPreparation;
    const dayMaxHour = storeBussinesHours[orderDayName][0].close;
    const sameDayDelivery = shipDayIsOpen && isBetweenOpenHours(orderWithPreparation, dayMaxHour);

    const pickingOrderDate = sameDayDelivery ? todayDate : getNextDayOpen(todayDate, storeBussinesHours);
    const shipDayName = dayNameUtil.getDayNameFromDate(pickingOrderDate); 

    const timeFrom = sameDayDelivery ? timeFromSameDay : sumStringNumbers(storeBussinesHours[shipDayName][0].open, formattedPreparationTime);
    const timeTo = storeBussinesHours[shipDayName][0].close;
    //if timeFrom === timeTo getNextDayOpen() TODO ASK
    return buildDateTime(pickingOrderDate, timeFrom, timeTo)
}

module.exports = { calculateShipDate };

