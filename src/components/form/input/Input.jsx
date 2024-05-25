import { twMerge } from 'tailwind-merge';
import Label from './Label';
import InputBox from '../InputBox';
import replace_ from '../../../utils/levelSplitter';
import InputError from '../InputError';

export const InputElement = ({
  label,
  type = 'text',
  className = '',
  ...props
}) => {
  return (
    <input
      type={type}
      {...props}
      className={twMerge('w-full border rounded-lg px-4 py-2.5', className)}
    />
  );
};

export const InputLabel = ({ label = '', children, className = '' }) => {
  return (
    <InputBox className={twMerge('relative', className)}>
      <Label>
        <span className="font-semibold capitalize block">
          {replace_(label)}
        </span>
        {children}
      </Label>
    </InputBox>
  );
};

const Input = ({ label = '', error = '', className = '', ...props }) => {
  return (
    <InputBox className={twMerge('relative', className)}>
      <Label>
        <span className="font-semibold capitalize">{replace_(label)}</span>
        <InputElement label={label} {...props} />
      </Label>
      <InputError error={error} className="absolute top-full left-0 px-2" />
    </InputBox>
  );
};

export default Input;
