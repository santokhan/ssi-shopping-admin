import { object, string, number, array, } from 'yup';

// Define individual validation schema for each key
export const display_name = string().required();
export const email = string().email().required();
export const phone = string().matches(/[0-9]{1,14}/).required(); //.matches(/[0-9]{1,14}/)
export const first_name = string().required();
export const last_name = string().required();
export const whatsapp_number = string().matches(/[0-9]{1,14}/).required();
export const speaks = string().required();
export const locationSchema = string().required();
export const years_of_expertise = number().integer().min(0).max(20).required();
export const category = array().of(
    object().shape({
        label: string().required(),
        value: string().required(),
    }).required()
).required();
export const nationality = string().notRequired().default('');
export const about = string().notRequired().default('');

// Combine individual schemas into one object schema
export const agentFormSchema = object().shape({
    display_name,
    email,
    phone,
    first_name,
    last_name,
    whatsapp_number,
    // speaks,
    location,
    years_of_expertise,
    category,
    nationality,
});

// Example usage:
// const data = {
//     "display_name": "2",
//     "email": "santokhan1999@gmail.com",
//     "phone": "+8801718787756",
//     "first_name": "Rifat",
//     "last_name": "Santo",
//     "whatsapp_number": "+9415021123",
//     "speaks": "asdfasfsd",
//     "location": "",
//     "years_of_expertise": "15",
//     "category": [
//         {
//             "id": "1",
//             "name": "Category 1"
//         }
//     ],
//     "nationality": "",
//     "status": "asdfsfsdfsfsdf",
//     "about": "sddsfsdfsfsdfsdfsdfsdfdsf"
// };

// const { error, value } = agentFormSchema.validate(data);
// if (error) {
//     console.error(error.details);
// } else {
//     console.log("Validation passed. Data:", value);
// }