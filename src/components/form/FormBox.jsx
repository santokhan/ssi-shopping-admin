import { twMerge } from 'tailwind-merge';

// White background box for forms
const FormBox = ({ children, className }) => {
  return (
    <div className={twMerge('bg-white p-4 lg:p-6 space-y-4', className)}>
      {children}
    </div>
  );
};

export default FormBox;
