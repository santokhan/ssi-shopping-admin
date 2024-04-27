import React, { useEffect, useState } from 'react';
import useAxios from '../useAxios';
import { useParams } from 'react-router-dom';
import { INITIAL, INITIAL_VALUES } from './initial';

export const PropertyFormContext = React.createContext(null);

const PropertyFormProvider = ({ children }) => {
  const [formData, setFormData] = useState(INITIAL);
  const [value, setValue] = useState(INITIAL_VALUES);
  const { api } = useAxios();
  const params = useParams();

  // Assign initial form data
  useEffect(() => {
    if (params.id) {
      api
        .get(`properties/${params.id}/`)
        .then((res) => {
          if (res.data) {
            setValue(res.data);
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
      console.log(updated);
      return updated;
    });
  }

  useEffect(() => {
    console.log(value);
  }, [value]);

  function resetForm() {
    setFormData(INITIAL);
  }

  // Submit the Create Form
  async function onCreate(e) {
    e.preventDefault();

    console.log(formData);

    try {
      const res = await api.post('properties/', '');
      if (res) {
        // redirect
        window.history.back();
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Submit the Edit Form
  function onEdit(e) {
    e.preventDefault();

    console.log(formData);

    try {
      const res = api.patch(`properties/${formData.id}/`, '');
      if (res) {
        // redirect
        window.history.back();
      }
    } catch (error) {
      console.error(error);
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
