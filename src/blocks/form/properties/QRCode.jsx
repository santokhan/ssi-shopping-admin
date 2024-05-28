import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Input, { InputLabel } from '../../../components/form/input/Input';
import Select from '../../../components/form/input/SelectOption';
import ResponsiveForm from '../../../components/form/ResponsiveForm';
import PrevAndNext from '../../../components/form/CancelOrSubmit';
import { formBack, formNext } from '../../../utils/form-steps';
import InputFileSingle from '../../../components/form/input/InputFileSingle';
import DevelopersProvider, {
  DevelopersContext,
} from '../../../context/developers/developers-context';

const QRCodeForm = ({ value, setValue }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const assignInput = (e) => {
    setValue(e.target.name, e.target.value);
  };

  const options = {
    structure_type: [
      {
        label: 'Yes',
        value: 'yes',
      },
      {
        label: 'No',
        value: 'no',
      },
    ],
    floor_no: [
      {
        label: '5',
        value: '5',
      },
      {
        label: '10',
        value: '10',
      },
    ],
  };

  return (
    <ResponsiveForm
      onSubmit={(e) => {
        e.preventDefault();
        navigate(formNext(pathname));
      }}
    >
      <div className="space-y-4">
        <Input
          name="name"
          label="properties/project name"
          value={value.title}
          onChange={assignInput}
          required
        />
        <Input
          name="project_number"
          label="project_number"
          value={value.project_number}
          onChange={assignInput}
          required
        />
        <Input
          name="permit_no"
          label="permit_no"
          value={value.permit_no}
          onChange={assignInput}
          required
        />
        <DevelopersProvider>
          <DevelopersContext>
            {({ developers }) => {
              return (
                <Select
                  name="developer"
                  label="developer"
                  options={
                    Array.isArray(developers)
                      ? developers.map(({ id, name }) => ({
                          value: id,
                          label: name,
                        }))
                      : []
                  }
                  value={value.developer || ''}
                  onChange={assignInput}
                  required
                  title={value.developer}
                />
              );
            }}
          </DevelopersContext>
        </DevelopersProvider>
      </div>
      <InputLabel label="QR code">
        <InputFileSingle
          name="qr_code"
          value={value.qr_code}
          setValue={setValue}
          className="basis-96 flex-grow"
          accept="image/*"
          required={!value.qr_code}
        />
      </InputLabel>
      <PrevAndNext back={formBack(pathname)} />
    </ResponsiveForm>
  );
};

export default QRCodeForm;
