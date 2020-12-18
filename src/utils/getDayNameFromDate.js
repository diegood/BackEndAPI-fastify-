const getDayNameFromDate = (date) => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const dayName = days[date.getDay()];
    return dayName;
}

module.exports = { getDayNameFromDate };