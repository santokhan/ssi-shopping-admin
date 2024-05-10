import React, { useEffect, useState } from 'react';
import useAxios from '../useAxios';
import { useNavigate, useParams } from 'react-router-dom';
import { PROJECT_INPUTS } from './initial';
import dataBridgeForProperties from '../../lib/project-data-bridge/dataBridgeForProject';

export const ProjectFormContext = React.createContext(null);

function makeFormData(value) {
  const formData = new FormData();

  for (const key in value) {
    if (Object.hasOwnProperty.call(value, key)) {
      const element = value[key];

      if (['images', 'interior_image', 'exterior_image'].includes(key)) {
        for (const key in element) {
          if (Object.hasOwnProperty.call(element, key)) {
            const image = element[key];
            if (image instanceof File) {
              formData.append('images', element[key]);
            }
          }
        }
      } else if (key == 'amenities') {
        //
      } else {
        formData.append(key, element);
      }
    }
  }

  return formData;
}

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
            const data = dataBridgeForProperties(res.data);
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

  async function onCreate(e) {
    e.preventDefault();

    const formData = makeFormData(value);

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

    const formData = makeFormData(value);

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
