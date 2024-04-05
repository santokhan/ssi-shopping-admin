function replace_(label) {
    if (label.includes("_")) {
        label = label.replace(/_/g, " "); // Use regex with 'g' flag to replace all occurrences
    }
    return label;
}

// Example usage:
// let label = "example_label";
// console.log(labelSplitter(label)); // Output: "example label"

export default replace_;
