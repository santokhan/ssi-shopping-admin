import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Input from '../../../components/form/input/Input';
import Textarea from '../../../components/form/input/Textarea';
import Select from '../../../components/form/input/SelectOption';
import ResponsiveForm from '../../../components/form/ResponsiveForm';
import PrevAndNext from '../../../components/form/CancelOrSubmit';
import { formBack, formNext } from '../../../utils/form-steps';
import { yesNoOptions } from '../../../utils/yes-no-options';
import { bedroomOptions } from '../../../utils/bedrooms';

const DetailsForm = ({ value, setValue }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <ResponsiveForm
      onSubmit={(e) => {
        e.preventDefault();
        navigate(formNext(pathname));
      }}
    >
      <Input
        type="number"
        name="size"
        label="total area (in ft)"
        value={value.size || ''}
        step="any"
        onChange={(e) => {
          setValue(e.target.name, parseFloat(e.target.value));
        }}
        required={true}
      />
      <Input
        type="number"
        name="built_up_size"
        label="Built Up Size (In FT)"
        value={value.built_up_size}
        step="any"
        onChange={(e) => {
          setValue(e.target.name, parseFloat(e.target.value));
        }}
        required={true}
      />
      <Select
        name="bedrooms"
        label="bedrooms"
        options={bedroomOptions.map((b) => ({ label: b, value: b }))}
        value={value.bedrooms || ''}
        onChange={(e) => {
          setValue(e.target.name, e.target.value);
        }}
        required={true}
      />
      <Input
        type="number"
        name="bathrooms"
        label="bathrooms"
        value={value.bathrooms}
        min={0}
        onChange={(e) => {
          setValue(e.target.name, parseInt(e.target.value));
        }}
        required={true}
      />
      <Input
        type="number"
        name="parking"
        label="parking"
        value={value.parking}
        min={0}
        onChange={(e) => {
          setValue(e.target.name, parseInt(e.target.value));
        }}
      />
      <Input
        type="number"
        name="garage_size"
        label="garage_size"
        value={value.garage_size}
        onChange={(e) => {
          setValue(e.target.name, parseInt(e.target.value));
        }}
      />
      <Input
        type="number"
        name="year_built"
        label="year_built (numeric)"
        value={value.year_built}
        onChange={(e) => {
          setValue(e.target.name, parseInt(e.target.value));
        }}
        min={1900}
        max={new Date().getFullYear()}
      />
      <Select
        name={'basement'}
        label={'basement'}
        options={yesNoOptions}
        value={value.basement}
        onChange={(e) => {
          setValue(e.target.name, e.target.value);
        }}
      />
      <Textarea
        name="extra_detail"
        label="Owner/ Agent notes (not visible on front end)"
        value={value.extra_detail}
        onChange={(e) => setValue(e.target.name, e.target.value)}
        className="col-span-full"
      />
      <PrevAndNext back={formBack(pathname)} />
    </ResponsiveForm>
  );
};

export default DetailsForm;
