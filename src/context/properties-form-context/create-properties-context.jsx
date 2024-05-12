import React, { createContext, useEffect, useState } from 'react';
import useAxios from '../useAxios';
import { useNavigate, useParams } from 'react-router-dom';
import { INITIAL, INITIAL_VALUES } from './initial';
import dataBridgeForProperties from '../../lib/property/dataBridgeForProperties';
import { errorToast } from '../../components/ShowError';

export const PropertyFormContext = createContext(null);

function encode(value) {
  const formData = new FormData();

  for (const key in value) {
    if (Object.hasOwnProperty.call(value, key)) {
      const ele = value[key];

      if (ele !== null && ele !== undefined && ele !== '') {
        if (key == 'images') {
          for (const key in ele) {
            if (Object.hasOwnProperty.call(ele, key)) {
              const image = ele[key];
              if (image instanceof File) {
                formData.append('images', ele[key]);
              } else {
                // I don't know
              }
            }
          }
        } else if (key == 'floor_plan') {
          if (ele instanceof File) {
            formData.append(key, ele);
          }
        } else if (key == 'floor_plan_thumbnail') {
          if (ele instanceof File) {
            formData.append(key, ele);
          }
        } else {
          formData.append(key, ele);
        }
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

    const formData = encode(value);

    try {
      const res = await api.post('/properties/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res) {
        navigate('/properties');
      }
    } catch (err) {
      const errors = err?.response?.data;
      errorToast(errors);
    }
  }

  async function onEdit(e) {
    e.preventDefault();

    const formData = encode(value);

    try {
      const res = await api.patch(`/properties/${params.id}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res) {
        navigate('/properties');
      }
    } catch (err) {
      const errors = err?.response?.data;
      errorToast(errors);
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
