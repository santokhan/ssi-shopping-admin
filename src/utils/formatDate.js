function formatDate(str) {
    // Split the input date string into day, month, and year
    var d = new Date(str);
    var day = d.getDate()
    var year = d.getFullYear();

    let month = d.toLocaleDateString('default', { month: 'long' });

    // Format the date
    var formattedDate = `${month.slice(0, 3)} ${day}, ${year}`;

    return formattedDate;
}

// // Example usage
// var inputDate = "3/8/2005";
// var formattedDate = formatDate(inputDate);
// console.log(formattedDate); // Output: "2 May, 2005"

export default formatDate;