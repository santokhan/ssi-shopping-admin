import { toast } from 'react-toastify';
import capitalize from '../utils/capitalize';

export const errorToast = (errorObject) => {
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

const showError = ({ err }) => {
  if (err.response.data) {
    const messages = err.response.data;
    errorToast(messages);
  }
};

export default showError;
