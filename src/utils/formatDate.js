function formatDate(str) {
    // Split the input date string into day, month, and year
    var d = new Date(str);
    var day = parseInt(d.getDay());
    var month = parseInt(d.getMonth());
    var year = parseInt(d.getFullYear());

    // Create a Date object with the parsed values
    var date = new Date(year, month - 1, day);

    // Array of month names
    var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    // Format the date
    var formattedDate = day + ' ' + monthNames[date.getMonth()] + ', ' + year;

    return formattedDate;
}

// // Example usage
// var inputDate = "2/5/2005";
// var formattedDate = formatDate(inputDate);
// console.log(formattedDate); // Output: "2 May, 2005"

export default formatDate;