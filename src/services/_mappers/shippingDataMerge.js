const composeData = (arrayDataBase, arraySearch, keyName, dataName, dataNameToAdd) => {

    const composedData = arrayDataBase.map((data) => {
        const objectFounded = arraySearch.find(key => key[keyName]=== data[dataName])
        data[dataNameToAdd] = objectFounded;
        return data;
    })
    return composedData;
}

module.exports = { composeData }