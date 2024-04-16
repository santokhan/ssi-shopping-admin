import React, { useState, useContext, useEffect } from 'react';

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
    featured: false,
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
    total_area: '',
    built_top_size: '',
    bedrooms: '',
    bathrooms: '',
    parking: '',
    garage_size: '',
    year_built: '',
    basement: false,
    extra_detail: '',
    energy_index: '',
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

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

  return (
    <PropertyFormContext.Provider value={{ formData, storeFormData }}>
      {children}
    </PropertyFormContext.Provider>
  );
};

export default CreatePropertyProvider;
