import { twMerge } from 'tailwind-merge';

export default function TD({ children, className = '', ...props }) {
  return (
    <td className={twMerge('px-6 py-4 ', className)} scope="col" {...props}>
      {children}
    </td>
  );
}
