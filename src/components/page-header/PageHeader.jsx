import { twMerge } from 'tailwind-merge';

export const Title = ({ children }) => {
  return (
    <h2 className="text-2xl lg:text-3xl font-medium text-gray-900">
      {children}
    </h2>
  );
};

export const Desc = ({ children }) => {
  return <p>{children}</p>;
};

export const Top = ({ children, className = '' }) => {
  return (
    <div className={twMerge('relative space-y-3 p-4 md:flex-row', className)}>
      {children}
    </div>
  );
};
