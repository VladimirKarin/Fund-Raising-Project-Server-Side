function validateSum(sum) {
    if (!Number.isInteger(sum)) {
        throw new Error('Sum should be a number.');
    }
}

module.exports = {
    validateSum,
};
