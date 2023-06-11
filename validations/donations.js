function validateSum(sum) {
    if (!sum) {
        throw new Error('Error. Please, check your sum.');
    }
    if (!Number.isInteger(sum)) {
        throw new Error('Sum should be a number.');
    }
}

module.exports = {
    validateSum,
};
