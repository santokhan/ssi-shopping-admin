import React, { useEffect, useState } from 'react';
import useAxios from '../useAxios';
import { useNavigate, useParams } from 'react-router-dom';
import { PROJECT_INPUTS } from './initial';
import validateProjects from '../../lib/property/validateProperties';

export const ProjectFormContext = React.createContext(null);

const ProjectFormProvider = ({ children }) => {
  const [value, setValue] = useState(PROJECT_INPUTS);
  const { api } = useAxios();
  const params = useParams();
  const navigate = useNavigate();

  // Assign initial form data
  useEffect(() => {
    if (params.id) {
      api
        .get(`projects/${params.id}/`)
        .then((res) => {
          if (res.data) {
            const data = validateProjects(res.data);
            setValue(data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [params.id]);

  function setFormValue(key, value) {
    setValue((prev) => {
      const updated = { ...prev, [key]: value };
      return updated;
    });
  }

  useEffect(() => {
    console.log(value);
  }, [value]);

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
            formData.append(
              // 'images[]',
              'images',
              element[i],
            );
          }
        } else {
          formData.append(key, element);
        }
      }
    }

    console.log(Array.from(formData));

    try {
      const res = await api.post('/projects/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res) {
        // redirect
        navigate('/projects');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function onEdit(e) {
    e.preventDefault();

    const formData = new FormData();

    const data = { ...value };
    // delete data.amenities; // I have to fix it later

    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        const element = data[key];
        if (key == 'images') {
          for (let i = 0; i < element.length; i++) {
            formData.append(
              // 'images[]',
              'images',
              element[i],
            );
          }
        } else {
          formData.append(key, element);
        }
      }
    }

    try {
      const res = await api.patch(`/projects/${params.id}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res) {
        // redirect
        navigate('/projects');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ProjectFormContext.Provider
      value={{
        resetForm() {
          setValue(PROJECT_INPUTS);
        },
        onCreate,
        onEdit,
        value,
        setFormValue,
      }}
    >
      {children}
    </ProjectFormContext.Provider>
  );
};

export default ProjectFormProvider;
