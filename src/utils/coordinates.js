/**
 * Validates and parses a latitude or longitude coordinate.
 *
 * @param {string} coordinate - The coordinate to validate. Defaults to an empty string.
 * @returns {number} The parsed coordinate as a float, or 0 if invalid.
 */
function validateCoordinate(coordinate = '') {
    const parsedCoordinate = parseFloat(coordinate);
    return Number.isFinite(parsedCoordinate) ? parsedCoordinate : 0;
}

// // Test cases
// console.log(validateCoordinate(''));       // Output: 0 (empty string)
// console.log(validateCoordinate('12.345')); // Output: 12.345 (valid coordinate)
// console.log(validateCoordinate('abc'));    // Output: 0 (invalid coordinate)
// console.log(validateCoordinate(23.45));    // Output: 23.45 (valid coordinate)
// console.log(validateCoordinate(null));     // Output: 0 (null)
// console.log(validateCoordinate(undefined));// Output: 0 (undefined)

export default validateCoordinate;
