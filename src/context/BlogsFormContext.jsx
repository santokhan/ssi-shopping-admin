import React, { createContext, useState } from 'react';

export const BlogFormContext = createContext(null);

const BlogFormProvider = ({ children }) => {
  const [value, setValue] = useState({
    title: '',
    description: '',
    image: '',
    author: '',
    rating: 5,
  });

  const setTestiFormValue = (key, value) => {
    setValue((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  return (
    <BlogFormContext.Provider
      value={{
        value,
        setTestiFormValue,
      }}
    >
      {children}
    </BlogFormContext.Provider>
  );
};

export default BlogFormProvider;
