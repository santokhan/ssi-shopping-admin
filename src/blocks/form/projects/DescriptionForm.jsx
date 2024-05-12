import PrevAndNext from '../../../components/form/CancelOrSubmit';
import { useLocation, useNavigate } from 'react-router-dom';
import Input from '../../../components/form/input/Input';
import Select from '../../../components/form/input/SelectOption';
import Textarea from '../../../components/form/input/Textarea';
import { useEffect, useState } from 'react';
import ResponsiveForm from '../../../components/form/ResponsiveForm';
import { formNext } from '../../../utils/form-steps';
import useAxios from '../../../context/useAxios';
import {
  activeInActiveOptions,
  yesNoOptions,
} from '../../../utils/yes-no-options';
import Print from '../../../components/Print';

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
  const [agents, setAgents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState({});
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { api } = useAxios();

  useEffect(() => {
    async function getAgent() {
      try {
        const res = await api.get('agents/');

        return res;
      } catch (error) {
        console.log(error);
      }
    }

    getAgent().then((res) => {
      if (res.data) {
        const data = res.data;
        const results = data.results;
        setAgents(results);
      }
    });
  }, []);

  useEffect(() => {
    async function getCategories() {
      try {
        const res = await api.get('categories/');

        return res;
      } catch (error) {
        console.log(error);
      }
    }

    getCategories().then((res) => {
      if (res.data) {
        const data = res.data;
        const trimmed = data.map((c) => ({
          value: c.id,
          label: c.title,
        }));
        setCategories(trimmed);
      }
    });
  }, []);

  return (
    <ResponsiveForm
      onSubmit={(e) => {
        e.preventDefault();
        navigate(formNext(pathname));
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
        required
      />
      <Select
        name={inputs.category}
        label={inputs.category}
        options={categories}
        value={value.category}
        onChange={(e) => {
          setValue(inputs.category, parseInt(e.target.value));
        }}
        error={error.title}
        required
        disabled={categories.length === 0}
      />
      {/* <Select
        name={inputs.listed_in}
        label={inputs.listed_in}
        options={[
          {
            label: 'For Sale',
            value: 1,
          },
          {
            label: 'For Rent',
            value: 2,
          },
        ]}
        value={value.listed_in}
        onChange={(e) => {
          setValue(inputs.listed_in, parseInt(e.target.value));
        }}
        error={error.title}
        required
      /> */}
      <Select
        name={inputs.agent}
        label={inputs.agent}
        options={agents.map((a) => ({
          value: a.id,
          label: [a.first_name, a.last_name].join(' '),
        }))}
        value={value.agent}
        onChange={(e) => {
          setValue(inputs.agent, parseInt(e.target.value));
        }}
        error={error.title}
        required
      />
      <Select
        name={inputs.status}
        label={inputs.status}
        options={activeInActiveOptions}
        value={value.status}
        onChange={(e) => {
          setValue(inputs.status, e.target.value);
        }}
        error={error.title}
        required
      />
      <Input
        name={inputs.price}
        label={value.listed_in === 'sale' ? 'Price' : 'Rent Price/year'}
        type="number"
        onChange={(e) => {
          setValue(inputs.price, parseInt(e.target.value));
        }}
        value={value.price || 0}
        error={error.price}
        min={0}
        required
      />
      {/* <Select
        name={inputs.featured}
        label={inputs.featured}
        options={yesNoOptions}
        value={value.featured}
        onChange={(e) => {
          setValue(inputs.featured, e.target.value);
        }}
        error={error.title}
      /> */}
      <PrevAndNext back="/properties" />
    </ResponsiveForm>
  );
};

export default DescriptionForm;
