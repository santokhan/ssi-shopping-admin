function filterSpecialCharacters(input) {
    // Regular expression to match any character that is not a letter, digit, or whitespace
    const specialCharRegex = /[^a-zA-Z0-9\s]/g;

    // Replace all occurrences of special characters with an empty string
    return input.replace(specialCharRegex, '');
}

// // Example usage
// const inputString = "Santo@khan#123";
// const filteredString = filterSpecialCharacters(inputString);
// console.log(filteredString); // Output: "Hello World 123 "

export default filterSpecialCharacters