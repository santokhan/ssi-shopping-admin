import { createContext, useState } from 'react';

export const EnquiryStatusContext = createContext(null);

const EnquiryStatusProvider = ({ children }) => {
  const [statusFormIndex, setStatusFormIndex] = useState(null);

  return (
    <EnquiryStatusContext.Provider
      value={{ statusFormIndex, setStatusFormIndex }}
    >
      {children}
    </EnquiryStatusContext.Provider>
  );
};

export default EnquiryStatusProvider;
