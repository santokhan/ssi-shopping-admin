import React from 'react';
import { Outlet } from 'react-router-dom';
import PropertyFormProvider from '../../context/properties-form-context/create-properties-context';

const PropertiesLayout = () => {
  return (
    <PropertyFormProvider>
      <Outlet />
    </PropertyFormProvider>
  );
};

export default PropertiesLayout;
