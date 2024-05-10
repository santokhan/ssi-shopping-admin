import React, { useEffect, useState } from 'react';
import useAxios from '../useAxios';
import { useNavigate, useParams } from 'react-router-dom';
import { INITIAL, INITIAL_VALUES } from './initial';
import dataBridgeForProperties from '../../lib/property/dataBridgeForProperties';

export const PropertyFormContext = React.createContext(null);

function makeFormData(value) {
  const formData = new FormData();

  for (const key in value) {
    if (Object.hasOwnProperty.call(value, key)) {
      const element = value[key];

      if (key == 'images') {
        for (const key in element) {
          if (Object.hasOwnProperty.call(element, key)) {
            const image = element[key];
            if (image instanceof File) {
              formData.append('images', element[key]);
            } else {
              // I don't know
            }
          }
        }
      } else {
        formData.append(key, element);
      }
    }
  }

  return formData;
}

const PropertyFormProvider = ({ children }) => {
  const [formData, setFormData] = useState(INITIAL);
  const [value, setValue] = useState(INITIAL_VALUES);
  const { api } = useAxios();
  const params = useParams();
  const navigate = useNavigate();

  // Assign initial form data
  useEffect(() => {
    if (!isNaN(params.id)) {
      api
        .get(`properties/${params.id}/`)
        .then((res) => {
          if (res.data) {
            const data = dataBridgeForProperties(res.data);
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

  function resetForm() {
    setFormData(INITIAL);
    setValue(INITIAL_VALUES);
  }

  // Submit the Create Form
  async function onCreate(e) {
    e.preventDefault();

    const formData = makeFormData(value);

    try {
      const res = await api.post('/properties/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res) {
        navigate('/properties');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function onEdit(e) {
    e.preventDefault();

    const formData = makeFormData(value);

    try {
      const res = await api.patch(`/properties/${params.id}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res) {
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
