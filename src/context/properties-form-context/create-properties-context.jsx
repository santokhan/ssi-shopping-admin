import React, { useState, useContext, useEffect } from 'react';
import api from '../../axios/api';

export const PropertyFormContext = React.createContext();

const INITIAL = {
  // description
  description: {
    title: '',
    description: '',
    category: '',
    listed_in: '',
    agent: '',
    status: false,
    price: 0,
    featured: '',
  },
  // media
  media: {
    images: [],
    video_from: '',
    embed_video_id: '',
    virtual_tour: '',
  },
  // location
  location: {
    address: '',
    country: '',
    city: '',
    area: '',
    latitude: '',
    longitude: '',
  },
  // details
  details: {
    size: '',
    suitable: '',
    type: '',
    bedrooms: 0,
    bathrooms: 0,
    parking: 0,
    garage_size: 0,
    year_built: 0,
    available_from: 0,
    basement: '',
    extra_detail: '',
    roofing: '',
    exterior_material: '',
    structure_type: '',
    floor_no: 0,
    energy_class: 0,
    energy_index: 0,
  },
  // amenities
  amenities: [],
};

const CreatePropertyProvider = ({ children }) => {
  const [formData, setFormData] = useState(INITIAL);

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

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <PropertyFormContext.Provider value={{ formData, storeFormData }}>
      {children}
    </PropertyFormContext.Provider>
  );
};

export default CreatePropertyProvider;
