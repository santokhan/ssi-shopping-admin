import { twMerge } from 'tailwind-merge';

const PropertiesFormTitle = ({ children, className = '' }) => {
  return (
    <h2 className={twMerge('text-xl font-bold text-gray-900', className)}>
      {children}
    </h2>
  );
};

export default PropertiesFormTitle;
