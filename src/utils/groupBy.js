/**
 * @function groupBy
 * @param {Array} data
 * @param {String} key
 * @return {object}
 */
const groupBy = function(data, key) {
    return data.reduce((rv, x) => {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};

module.exports = {
    groupBy
};