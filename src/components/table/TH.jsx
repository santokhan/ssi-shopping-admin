import { twMerge } from 'tailwind-merge';

export default function TH({ children, className = '', ...props }) {
  return (
    <th
      className={twMerge('text-start px-6 py-3 whitespace-nowrap', className)}
      scope="col"
      {...props}
    >
      {children}
    </th>
  );
}
