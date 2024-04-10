import React from 'react';
import { twMerge } from 'tailwind-merge';

const ResponsiveForm = ({ onSubmit = () => {}, children, className = '' }) => {
  return (
    <form
      onSubmit={onSubmit}
      className={twMerge(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-5 lg:gap-x-6 mt-8',
        className,
      )}
    >
      {children}
    </form>
  );
};

export default ResponsiveForm;
