/**
 * Remove all other keys from the object of array
 * 
 * @param {*} amenities 
 * @returns 
 */
function trimAmenities(amenities) {
    if (Array.isArray(amenities)) {
        return amenities?.map(({ id }) => id).flat();
    } else {
        return [];
    }
}

// // Example usage
// const amenities = [
//     {
//         id: 1,
//         label: "example label",
//         icon: 'https://picsum.photos/200/300',
//     }
// ]
// console.log(trimAmenities(amenities));
// // Output: [1]

export default trimAmenities;