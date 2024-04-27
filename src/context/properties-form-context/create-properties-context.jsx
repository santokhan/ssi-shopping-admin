import React, { useEffect, useState } from 'react';
import useAxios from '../useAxios';
import { useNavigate, useParams } from 'react-router-dom';
import { FILLED, INITIAL, INITIAL_VALUES } from './initial';
import validateProperties from '../../lib/property/validateProperties';

export const PropertyFormContext = React.createContext(null);

const PropertyFormProvider = ({ children }) => {
  const [formData, setFormData] = useState(INITIAL);
  const [value, setValue] = useState(INITIAL_VALUES);
  const { api } = useAxios();
  const params = useParams();
  const navigate = useNavigate();

  // Assign initial form data
  useEffect(() => {
    if (params.id) {
      api
        .get(`properties/${params.id}/`)
        .then((res) => {
          if (res.data) {
            const data = validateProperties(res.data);
            console.log('Value from server', data);
            setValue(data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [params.id]);

  /**
   * A function that stores form data.
   *
   * @param {string} formName - the name of the form
   * @param {object} formData - the data to be stored
   */
  function storeFormData(formName, formData) {
    const newFormData = {
      [formName]: formData,
    };

    setFormData((prev) => ({ ...prev, ...newFormData }));
  }

  function setFormValue(key, value) {
    setValue((prev) => {
      const updated = { ...prev, [key]: value };
      return updated;
    });
  }

  // useEffect(() => {
  //   console.log(value);
  // }, [value]);

  function resetForm() {
    setFormData(INITIAL);
    setValue(INITIAL_VALUES);
  }

  // Submit the Create Form
  async function onCreate(e) {
    e.preventDefault();

    const formData = new FormData();

    const data = value;
    // const data = { ...value, ...FILLED };
    delete data.amenities; // I have to fix it later

    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        const element = data[key];
        if (key == 'images') {
          for (let i = 0; i < element.length; i++) {
            formData.append('images[]', element[i]);
          }
        } else {
          formData.append(key, element);
        }
      }
    }

    console.log(Array.from(formData));

    try {
      const res = await api.post('/properties/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res) {
        // redirect
        navigate('/properties');
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Submit the Edit Form
  async function onEdit(e) {
    e.preventDefault();

    const formData = new FormData();

    for (const key in value) {
      if (Object.hasOwnProperty.call(value, key)) {
        const element = value[key];
        formData.append(key, element);
      }
    }

    console.log(Array.from(formData));

    try {
      const res = await api.post('/properties/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res) {
        // redirect
        navigate('/properties');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <PropertyFormContext.Provider
      value={{
        // formData
        formData,
        storeFormData,
        // handle forms
        resetForm,
        onCreate,
        onEdit,
        // value
        value,
        setFormValue,
      }}
    >
      {children}
    </PropertyFormContext.Provider>
  );
};

export default PropertyFormProvider;
