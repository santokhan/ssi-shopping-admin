import React, { useState, useContext, useEffect } from 'react';
import api from '../../axios/api';

// Create a context to manage form state
export const PropertyFormContext = React.createContext();

// Custom hook to consume the form context
// export const useCreatedPropertyContext = () => {
//   return useContext(PropertyFormContext);
// };

function combineFormData(...formDatas) {
  // Create a new FormData instance to combine all data
  const combinedFormData = new FormData();

  // Iterate over each FormData object passed as arguments
  formDatas.forEach((formData) => {
    // Iterate over each entry (key-value pair) in the current FormData
    for (const [key, value] of formData.entries()) {
      // Append each entry to the combined FormData
      combinedFormData.append(key, value);
    }
  });

  // Return the combined FormData
  return combinedFormData;
}

const CreatePropertyProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    description: null,
    media: null,
    location: null,
    details: null,
    amenities: null,
  });

  function storeFormData(formName, formData) {
    const newFormData = {
      [formName]: formData,
    };

    setFormData((prev) => ({ ...prev, ...newFormData }));
  }

  function postData(amenities) {
    const data = { ...formData };
    if (!data.amenities) {
      data['amenities'] = amenities;
    }

    const merged = new FormData();

    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        const fData = data[key];
        if (fData instanceof FormData) {
          const fd_to_list = Array.from(fData);
          merged.append(key, fd_to_list);
        }
      }
    }

    // send to server
    // api
    //   .post('/properties/create/', data, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // fetch('http://localhost:5000/', {
    //   method: 'POST',
    //   body: merged,
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    console.log(Array.from(merged));
  }

  useEffect(() => {
    // only for check
    function testInput() {
      for (const key in formData) {
        if (Object.hasOwnProperty.call(formData, key)) {
          const data = formData[key];
          if (data) {
            console.log({ [key]: [...data] });
          }
        }
      }
    }

    // testInput();
  }, [formData]);

  return (
    <PropertyFormContext.Provider value={{ formData, storeFormData, postData }}>
      {children}
    </PropertyFormContext.Provider>
  );
};

export default CreatePropertyProvider;
