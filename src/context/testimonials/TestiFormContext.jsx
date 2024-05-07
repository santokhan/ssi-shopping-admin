import React, { createContext, useState } from 'react';

export const TestiFormContext = createContext(null);

const TestiFormContextProvider = ({ children }) => {
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
    <TestiFormContext.Provider
      value={{
        value,
        setTestiFormValue,
      }}
    >
      {children}
    </TestiFormContext.Provider>
  );
};

export default TestiFormContextProvider;
