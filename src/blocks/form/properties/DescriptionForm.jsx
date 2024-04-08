import { useForm } from 'react-hook-form';
import CancelOrSubmit from '../../../components/form/CancelOrSubmit';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/form/input/Input';
import Select from '../../../components/form/input/SelectOption';
import Textarea from '../../../components/form/input/Textarea';
import { useContext, useState } from 'react';
import ResponsiveForm from '../../../components/form/ResponsiveForm';
import { PropertyFormContext } from '../../../context/properties-form-context/create-properties-context';

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

const DescriptionForm = () => {
  const [formState, setFormState] = useState({
    title: '',
    description: '',
    category: '',
    listed_in: '',
    agent: '',
    status: '',
    price: 0,
    featured: '',
  });
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const { storeFormData } = useContext(PropertyFormContext);

  function setValue(key, value) {
    if (key === '') return;

    const changed = { ...formState, [key.trim()]: value };
    setFormState(changed);
  }

  function validateInput() {
    let isValid = true;

    return isValid;
  }

  function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    if (validateInput()) {
      storeFormData('description', formData);
      navigate('/properties/create/media');
    }
  }
  return (
    <ResponsiveForm onSubmit={onSubmit}>
      <Input
        name={inputs.title}
        label={inputs.title}
        type="text"
        required
        value={formState.title}
        maxLength={255}
        onChange={(e) => {
          setValue(inputs.title, e.target.value);
        }}
        error={error.title}
      />
      <Textarea
        label={inputs.description}
        name={inputs.description}
        value={formState.description}
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
            value: 'Real Estate Agent',
          },
          {
            label: 'Real Estate Agent',
            value: 'Real Estate Agent',
          },
        ]}
        value={formState.category}
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
            value: 'Real Estate Agent',
          },
          {
            label: 'Real Estate Agent',
            value: 'Real Estate Agent',
          },
        ]}
        value={formState.listed_in}
        onChange={(e) => {
          setValue(inputs.listed_in, e.target.value);
        }}
        error={error.title}
        required
      />
      <Select
        name={inputs.agent}
        label={inputs.agent}
        options={[
          {
            label: 'Real Estate Agent',
            value: 'Real Estate Agent',
          },
          {
            label: 'Real Estate Agent',
            value: 'Real Estate Agent',
          },
        ]}
        value={formState.agent}
        onChange={(e) => {
          setValue(inputs.agent, e.target.value);
        }}
        error={error.title}
        required
      />
      <Select
        name={inputs.status}
        label={inputs.status}
        options={[
          {
            label: 'Real Estate status',
            value: 'Real Estate status',
          },
          {
            label: 'Real Estate status',
            value: 'Real Estate status',
          },
        ]}
        value={formState.status}
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
          setValue(inputs.price, e.target.value);
        }}
        value={formState.price || 0}
        error={error.price}
        required
      />
      <Select
        name={inputs.featured}
        label={inputs.featured}
        options={[
          {
            label: 'Real Estate featured',
            value: 'Real Estate featured',
          },
          {
            label: 'Real Estate featured',
            value: 'Real Estate featured',
          },
        ]}
        value={formState.featured}
        onChange={(e) => {
          setValue(inputs.featured, e.target.value);
        }}
        error={error.title}
        required
      />

      <CancelOrSubmit />
      {/* <pre>{JSON.stringify(formState, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(error, null, 2)}</pre> */}
    </ResponsiveForm>
  );
};

export default DescriptionForm;
