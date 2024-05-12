/**
 * Capitalizes the first letter of a given string.
 *
 * @param {string} string The input string to capitalize.
 * @returns {string} The capitalized string.
 */
const capitalize = (string = '') => {
    if (typeof string !== 'string') {
        return '';
    }

    const [firstLetter, ...rest] = string;
    return firstLetter.toUpperCase() + rest.join('');
};

export default capitalize