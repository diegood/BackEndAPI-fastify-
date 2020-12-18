const normalizeString = (string) => {
    let normalizedString = string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    normalizedString = normalizedString.toLowerCase().replace(/\s+|[,\/]/g, "-");

    return normalizedString;
}

module.exports = { normalizeString }