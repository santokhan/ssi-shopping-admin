import React, { createContext, useState } from 'react';

export const BlogFormContext = createContext(null);

const BlogFormProvider = ({ children }) => {
  const [value, setValue] = useState({
    title: '',
    sub_title: '',
    description: '',
    image: '',
    author: '',
    tags: [],
    category: [],
  });

  const setFormValue = (key, value) => {
    setValue((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  return (
    <BlogFormContext.Provider
      value={{
        value,
        setFormValue,
      }}
    >
      {children}
    </BlogFormContext.Provider>
  );
};

export default BlogFormProvider;
