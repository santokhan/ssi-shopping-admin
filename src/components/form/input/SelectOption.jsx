import replace_ from '../../../utils/levelSplitter';
import InputBox from '../InputBox';
import InputError from '../InputError';
import Label from './Label';

const Select = ({
  label = '',
  error = '',
  options = [],
  className = '',
  value = '',
  ...props
}) => {
  value = value || '';

  return (
    <InputBox>
      <Label>
        <span className="font-semibold capitalize">{replace_(label)}</span>
        <select
          {...props}
          value={value}
          className="w-full border rounded-lg px-3 py-3 bg-transparent capitalize"
        >
          <option value="" disabled>
            Choose {replace_(label)}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </Label>
      <InputError error={error} />
    </InputBox>
  );
};

export default Select;
