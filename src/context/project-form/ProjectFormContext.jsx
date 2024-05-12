import React, { createContext, useEffect, useState } from 'react';
import useAxios from '../useAxios';
import { useNavigate, useParams } from 'react-router-dom';
import { PROJECT_INPUTS } from './initial';
import dataBridgeForProperties from '../../lib/project-data-bridge/dataBridgeForProject';
import { errorToast } from '../../components/ShowError';

export const ProjectFormContext = createContext(null);

function makeFormData(value) {
  const formData = new FormData();

  for (const key in value) {
    if (Object.hasOwnProperty.call(value, key)) {
      const ele = value[key];

      if (ele !== null && ele !== undefined && ele !== '') {
        if (['images', 'interior_images', 'exterior_images'].includes(key)) {
          // multiple image input
          for (const iterator in ele) {
            if (Object.hasOwnProperty.call(ele, iterator)) {
              const image = ele[iterator];
              if (image instanceof File) {
                formData.append(key, image);
              }
            }
          }
        } else if (key == 'amenities') {
          if (Array.isArray(ele)) {
            ele.forEach((id) => {
              if (!isNaN(id)) {
                formData.append(key, id);
              }
            });
          }
        } else if (key == 'brochure') {
          if (ele instanceof File) {
            formData.append(key, ele);
          }
        } else if (key == 'brochure_thumbnail') {
          if (ele instanceof File) {
            formData.append(key, ele);
          }
        } else if (key == 'roadmap') {
          if (Array.isArray(ele)) {
            const roadmap = ele.filter((o) => o.place);

            // don't sent []
            if (roadmap.length > 0) {
              formData.append(key, JSON.stringify(roadmap));
            }
          }
        } else {
          formData.append(key, ele);
        }
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
    } catch (err) {
      const errors = err?.response?.data;
      errorToast(errors);
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
