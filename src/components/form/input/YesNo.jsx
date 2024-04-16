import { yesNoOptions } from '../../../utils/yes-no-options';
import InputBox from '../InputBox';
import Select from './SelectOption';

const YesNo = ({ name, label, value, setValue, ...props }) => {
  return (
    <InputBox>
      <Select
        name={name}
        label={label}
        options={yesNoOptions}
        value={value.agent}
        onChange={(e) => {
          setValue(name, e.target.value);
        }}
        required
      />
    </InputBox>
  );
};
