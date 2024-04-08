import CancelOrSubmit from '../../../components/form/CancelOrSubmit';
import { useNavigate } from 'react-router-dom';
import Select from '../../../components/form/input/SelectOption';
import Input from '../../../components/form/input/Input';
import MediaInput from '../../../components/form/input/MediaInput';
import ResponsiveForm from '../../../components/form/ResponsiveForm';
import PropertiesFormTitle from '../../../components/form/PropertiesFormTitle';
import { useContext, useState } from 'react';
import { PropertyFormContext } from '../../../context/properties-form-context/create-properties-context';

const inputList = ['video_from', 'embed_video_id', 'virtual_tour'];

const inputs = inputList.reduce((obj, item) => {
  obj[item] = item;
  return obj;
}, {});

const MediaForm = () => {
  const [formState, setFormState] = useState({
    video_from: '',
    embed_video_id: '',
    virtual_tour: '',
  });
  const navigate = useNavigate();
  const { storeFormData } = useContext(PropertyFormContext);
  const [error, setError] = useState({});

  const setValue = (key, value) => {
    if (key === '') return;
    const newState = { [key.trim()]: value };
    setFormState((prev) => ({ ...prev, ...newState }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    storeFormData('media', formData);

    navigate('/properties/create/location');
  };

  return (
    <ResponsiveForm onSubmit={onSubmit}>
      <MediaInput className="col-span-full" />
      <div className="col-span-full pt-3">
        <PropertiesFormTitle>Video Option</PropertiesFormTitle>
      </div>
      <Select
        name={inputs.video_from}
        options={[
          {
            label: 'youtube',
            value: 'youtube',
          },
          {
            label: 'youtube',
            value: 'youtube',
          },
        ]}
        label={inputs.video_from}
        value={formState.video_from}
        onChange={(e) => {
          setValue(inputs.video_from, e.target.value);
        }}
        required
      />
      <Input
        type="text"
        name={inputs.embed_video_id}
        label={inputs.embed_video_id}
        value={formState.embed_video_id}
        onChange={(e) => {
          setValue(inputs.embed_video_id, e.target.value);
        }}
        required
      />
      <div className="col-span-full pt-3">
        <PropertiesFormTitle>Virtual Tour</PropertiesFormTitle>
      </div>
      <Input
        type="text"
        name={inputs.virtual_tour}
        label={inputs.virtual_tour}
        value={formState.virtual_tour}
        onChange={(e) => {
          setValue(inputs.virtual_tour, e.target.value);
        }}
        required
      />
      <CancelOrSubmit />
    </ResponsiveForm>
  );
};

export default MediaForm;
