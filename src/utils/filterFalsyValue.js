/**
 * Filter falsy properties from object
 * 
 * @param {*} obj 
 * @returns 
 */
const checkFalsyValue = obj =>
    Object.fromEntries(
        Object.entries(obj).map(([key, value]) => ([key, value ? value : '']))
    );

// // Example object
// const myObject = {
//     key1: "value1",
//     key2: null,
//     key3: "value3",
//     key4: undefined,
//     key5: NaN,
//     key6: "value6"
// };

// // Filter keys with null, undefined, or NaN values
// const filteredObject = filterValue(myObject);
// console.log(filteredObject);

export default checkFalsyValue