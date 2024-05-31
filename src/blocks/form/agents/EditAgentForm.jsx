import React, { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Textarea from '../../../components/form/input/Textarea';
import FormTitle from '../../../components/form/FormTitle';
import Input from '../../../components/form/input/Input';
import Select from '../../../components/form/input/SelectOption';
import SubmitButton from '../../../components/form/SubmitButton';
import AgentImageInput from '../../../components/form/input/AgentImageInput';
import MultipleSelect from '../../../components/form/input/MultipleSelect';
import { nationalityList } from '../../../utils/nationality';
import useAxios from '../../../context/useAxios';
import { useNavigate, useParams } from 'react-router-dom';
import InputBox from '../../../components/form/InputBox';
import ResponsiveForm from '../../../components/form/ResponsiveForm';
import {
  LanguageCodesContext,
  LanguageCodesProvider,
} from '../../../context/LanguageCodesContext';
import CategoriesProvider, {
  CategoriesContext,
} from '../../../context/CategoriesContext';
import { errorToast } from '../../../components/ShowError';

const inputs = {
  photo: 'photo',
  display_name: 'display_name',
  email: 'email',
  phone: 'phone',
  first_name: 'first_name',
  last_name: 'last_name',
  whatsapp_number: 'whatsapp_number',
  speaks: 'speaks',
  location: 'location',
  years_of_expertise: 'years_of_expertise',
  category: 'category',
  nationality: 'nationality',
  about: 'about',
};

const initialAgent = {
  photo: '',
  display_name: '',
  email: '',
  phone: '',
  first_name: '',
  last_name: '',
  whatsapp_number: '',
  speaks: [],
  location: '',
  years_of_expertise: 0,
  category: [],
  nationality: '',
  about: '',
};

const patternPhone = '[0-9]{1,14}';

const EditAgentForm = () => {
  const [formState, setFormState] = useState(initialAgent);
  const [error, setError] = useState({});
  const { api } = useAxios();
  const navigate = useNavigate();
  const { id } = useParams();

  function setValue(key, value) {
    if (!key) return;
    setFormState((prev) => ({ ...prev, [key.trim()]: value }));
    setError((prev) => ({ ...prev, [key]: '' }));
  }

  let nationalityOptions = nationalityList.map((item) => {
    return {
      label: item.nationality,
      value: item.nationality.toLowerCase(),
    };
  });
  nationalityOptions.unshift({
    label: 'Choose Nationality',
    value: '',
  });

  function validateInput() {
    let isValid = true;
    for (const key in formState) {
      if (Object.hasOwnProperty.call(formState, key)) {
        const value = formState[key];
        if (key === inputs.category && value.length == 0) {
          setError({ ...error, [key]: 'Please select at least one option' });
          isValid = false;
        }
        if (key === inputs.speaks && value.length == 0) {
          setError({ ...error, [key]: 'Please select at least one option' });
          isValid = false;
        }
      }
    }
    return isValid;
  }

  function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.append('category', JSON.stringify(formState.category));
    formData.append('speaks', JSON.stringify(formState.speaks));

    api
      .patch(`agents/${id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        if (res) {
          // redirect
          navigate('agents');
        }
      })
      .catch((err) => {
        const errors = err?.response?.data;
        errorToast(errors);
      });
  }

  const imageUrl = '';

  useEffect(() => {
    api
      .get(`agents/${id}/`)
      .then((res) => {
        const data = res.data;
        if (data) {
          setFormState({
            display_name: data.display_name,
            email: data.email,
            phone: data.phone,
            first_name: data.first_name,
            last_name: data.last_name,
            whatsapp_number: data.whatsapp_number,
            speaks: data.speaks.split(',').map((item) => ({
              label: item.trim(),
              value: item.trim().toLowerCase(),
            })),
            location: data.location,
            years_of_expertise: data.years_of_expertise,
            category: data.category.split(',').map((item) => ({
              label: item.trim(),
              value: item.trim().toLowerCase(),
            })),
            nationality: data.nationality,
            about: data.about || '',
            photo: '',
          });
        }
      })
      .catch((err) => {
        const errors = err?.response?.data;
        errorToast(errors);
      });
  }, [id]);

  return (
    <div className="bg-white rounded-xl p-4 lg:p-6">
      <ResponsiveForm onSubmit={onSubmit} className="!mt-0">
        <InputBox className={'col-span-full pb-2'}>
          <FormTitle>Photo</FormTitle>
          <AgentImageInput
            src={imageUrl}
            onChangeImage={(file) => {
              console.log(file);
            }}
          />
        </InputBox>
        <Input
          label={inputs.display_name}
          type="text"
          name={inputs.display_name}
          className=""
          required={true}
          value={formState.display_name}
          maxLength={255}
          onChange={(e) => {
            e.preventDefault();
            setValue(inputs.display_name, e.target.value);
          }}
          error={error.display_name}
        />
        <Input
          label={inputs.email}
          name={inputs.email}
          className=""
          type="email"
          required={true}
          value={formState.email}
          onChange={(e) => {
            setValue(inputs.email, e.target.value);
          }}
          error={error.email}
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
        />
        <Input
          label={inputs.phone}
          name={inputs.phone}
          type="text"
          className=""
          required={true}
          pattern={patternPhone}
          value={formState.phone}
          maxLength={14}
          onChange={(e) => {
            setValue(
              inputs.phone,
              e.target.value.replace(/\+/g, '').replace(/[^+\d]/g, ''),
            );
          }}
          error={error.phone}
        />
        <Input
          label={inputs.first_name}
          name={inputs.first_name}
          type="text"
          className=""
          required={true}
          value={formState.first_name}
          onChange={(e) => {
            setValue(inputs.first_name, e.target.value);
          }}
          error={error.first_name}
        />
        <Input
          label={inputs.last_name}
          name={inputs.last_name}
          type="text"
          className=""
          required={true}
          value={formState.last_name}
          onChange={(e) => {
            setValue(inputs.last_name, e.target.value);
          }}
          error={error.last_name}
        />
        <Input
          label={inputs.whatsapp_number}
          name={inputs.whatsapp_number}
          type="text"
          className=""
          required={true}
          pattern={patternPhone}
          title="Enter a valid WhatsApp number"
          value={formState.whatsapp_number}
          maxLength={14}
          onChange={(e) => {
            setValue(
              inputs.whatsapp_number,
              e.target.value.replace(/\+/g, '').replace(/[^+\d]/g, ''),
            );
          }}
          error={error.whatsapp_number}
        />
        <LanguageCodesProvider>
          <LanguageCodesContext.Consumer>
            {({ languageCodes }) => {
              return (
                languageCodes.length > 0 && (
                  <MultipleSelect
                    label={inputs.speaks}
                    name={inputs.speaks}
                    options={languageCodes.map(({ language, code }) => ({
                      value: code,
                      label: language,
                    }))}
                    onSelect={(language) => {
                      setValue(inputs.speaks, language);
                      setError({ ...error, [inputs.speaks]: '' });
                    }}
                    value={formState.speaks}
                    error={error.speaks}
                  />
                )
              );
            }}
          </LanguageCodesContext.Consumer>
        </LanguageCodesProvider>
        <Select
          label={inputs.nationality}
          name={inputs.nationality}
          options={nationalityOptions}
          required={true}
          value={formState.nationality}
          onChange={(e) => {
            setValue(inputs.nationality, e.target.value);
          }}
          error={error.nationality}
        />
        <Input
          label={inputs.years_of_expertise}
          name={inputs.years_of_expertise}
          type="number"
          className=""
          required={true}
          min={0}
          value={formState.years_of_expertise}
          onChange={(e) => {
            setValue(inputs.years_of_expertise, e.target.value);
          }}
          error={error.years_of_expertise}
        />
        <CategoriesProvider>
          <CategoriesContext.Consumer>
            {({ categories }) => {
              return (
                categories.length > 0 && (
                  <MultipleSelect
                    label={inputs.category}
                    name={inputs.category}
                    options={categories.map(({ title, id }) => ({
                      value: id,
                      label: title,
                    }))}
                    onSelect={(category) => {
                      setValue(inputs.category, category);
                      setError({ ...error, [inputs.category]: '' });
                    }}
                    // value={formState.category}
                    error={error.category}
                  />
                )
              );
            }}
          </CategoriesContext.Consumer>
        </CategoriesProvider>
        <Input
          label={inputs.location}
          name={inputs.location}
          type="text"
          className=""
          required={true}
          value={formState.location}
          onChange={(e) => {
            setValue(inputs.location, e.target.value);
          }}
          error={error.location}
        />
        <Textarea
          label={inputs.about}
          name={inputs.about}
          className="col-span-full"
          value={formState.about}
          onChange={(e) => {
            setValue(inputs.about, e.target.value);
          }}
          error={error.about}
        />
        <div className={twMerge('col-span-full flex justify-end gap-2')}>
          <SubmitButton type="submit">Submit</SubmitButton>
        </div>
      </ResponsiveForm>
    </div>
  );
};

export default EditAgentForm;
