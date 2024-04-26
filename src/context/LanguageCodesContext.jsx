import React, { createContext, useEffect, useState } from 'react';

export const LanguageCodesContext = createContext(null);

export const LanguageCodesProvider = ({ children }) => {
  const [languageCodes, setLanguageCodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLanguageCodes = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/language-codes.json').then((res) =>
          res.json(),
        );
        setLanguageCodes(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLanguageCodes();
  }, []);

  return (
    <LanguageCodesContext.Provider value={{ languageCodes, loading }}>
      {children}
    </LanguageCodesContext.Provider>
  );
};
