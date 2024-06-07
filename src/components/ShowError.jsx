import { toast } from 'react-toastify';
import capitalize from '../utils/capitalize';

const errorToast = (errorObject) => {
  if (typeof errorObject == 'object') {
    for (const key in errorObject) {
      if (Object.hasOwnProperty.call(errorObject, key)) {
        const error = errorObject[key];

        // if it is an array of errors with key : value pairs
        if (Array.isArray(error)) {
          error.forEach((_, i) => {
            if (typeof _ === 'string') {
              toast(capitalize(key) + ': ' + _, { type: 'Failed' });
            }
          });
        }

        // if it is a string
        if (typeof error == 'string') {
          toast(capitalize(key) + ': ' + error, { type: 'Failed' });
        }
      }
    }
  } else {
    console.log(`Errors not an array`, errorObject);
  }
};

// // Example
// const errorObject = {
//   username: ['This field must be unique.'],
// };
// console.log(errorToast(errorObject));

const showError = ({ err }) => {
  if (typeof err === 'string') {
    toast(err, { type: 'Failed' });
  } else if (typeof err === 'object') {
    if (err.response) {
      const messages = err.response.data;
      errorToast(messages);
    } else {
      // For object like { error: 'Wrong password!' }
      for (const key in err) {
        if (Object.hasOwnProperty.call(err, key)) {
          const element = err[key];
          if (typeof element == 'string') {
            toast(element, { type: 'Failed' });
          }
        }
      }
    }
  }
};

export default showError;
export { errorToast };
