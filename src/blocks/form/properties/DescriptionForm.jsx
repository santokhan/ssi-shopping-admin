import PrevAndNext from '../../../components/form/CancelOrSubmit';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/form/input/Input';
import Select from '../../../components/form/input/SelectOption';
import Textarea from '../../../components/form/input/Textarea';
import { useState } from 'react';
import ResponsiveForm from '../../../components/form/ResponsiveForm';
import { formNext } from '../../../utils/form-steps';

const inputList = [
  'title',
  'description',
  'category',
  'listed_in',
  'agent',
  'status',
  'price',
  'featured',
];

const inputs = inputList.reduce((obj, item) => {
  obj[item] = item;
  return obj;
}, {});

const DescriptionForm = ({ value, setValue }) => {
  const [error, setError] = useState({});
  const navigate = useNavigate();

  function validateInput() {
    let isValid = true;

    return isValid;
  }

  return (
    <ResponsiveForm
      onSubmit={(e) => {
        e.preventDefault();

        navigate(formNext(''));
      }}
    >
      <Input
        name={inputs.title}
        label={inputs.title}
        type="text"
        required
        value={value.title}
        maxLength={255}
        onChange={(e) => {
          setValue(inputs.title, e.target.value);
        }}
        error={error.title}
        className="col-span-full"
      />
      <Textarea
        label={inputs.description}
        name={inputs.description}
        value={value.description}
        onChange={(e) => {
          setValue(inputs.description, e.target.value);
        }}
        error={error.title}
        className="col-span-full"
      />
      <Select
        name={inputs.category}
        label={inputs.category}
        options={[
          {
            label: 'Real Estate Agent',
            value: '1',
          },
          {
            label: 'Real Estate Agent',
            value: '2',
          },
        ]}
        value={value.category}
        onChange={(e) => {
          setValue(inputs.category, e.target.value);
        }}
        error={error.title}
        required
      />
      <Select
        name={inputs.listed_in}
        label={inputs.listed_in}
        options={[
          {
            label: 'Real Estate Agent',
            value: '1',
          },
          {
            label: 'Real Estate Agent',
            value: '2',
          },
        ]}
        value={value.listed_in}
        onChange={(e) => {
          setValue(inputs.listed_in, e.target.value);
        }}
        error={error.title}
        required
      />
      <Input
        name={inputs.agent}
        label={inputs.agent}
        type="number"
        required
        value={value.agent}
        maxLength={255}
        onChange={(e) => {
          setValue(inputs.agent, parseInt(e.target.value));
        }}
        error={error.title}
        className=""
      />
      <Select
        name={inputs.status}
        label={inputs.status}
        options={[
          {
            label: 'Active',
            value: 'true',
          },
          {
            label: 'Inactive',
            value: 'false',
          },
        ]}
        value={value.status}
        onChange={(e) => {
          setValue(inputs.status, e.target.value);
        }}
        error={error.title}
        required
      />
      <Input
        name={inputs.price}
        label={inputs.price}
        type="number"
        onChange={(e) => {
          setValue(inputs.price, parseInt(e.target.value));
        }}
        value={value.price || 0}
        error={error.price}
        required
      />
      <Select
        name={inputs.featured}
        label={inputs.featured}
        options={[
          {
            label: 'Yes',
            value: 'true',
          },
          {
            label: 'No',
            value: 'false',
          },
        ]}
        value={value.featured}
        onChange={(e) => {
          setValue(inputs.featured, e.target.value);
        }}
        error={error.title}
      />
      <PrevAndNext
        onBack={() => {
          navigate('/properties');
        }}
      />
    </ResponsiveForm>
  );
};

export default DescriptionForm;
