import PrevAndNext from '../../../components/form/CancelOrSubmit';
import { useLocation, useNavigate } from 'react-router-dom';
import Select from '../../../components/form/input/SelectOption';
import Input from '../../../components/form/input/Input';
import MediaInput from '../../../components/form/input/MediaInput';
import ResponsiveForm from '../../../components/form/ResponsiveForm';
import PropertiesFormTitle from '../../../components/form/PropertiesFormTitle';
import { formBack, formNext } from '../../../utils/form-steps';
import Textarea from '../../../components/form/input/Textarea';

const inputList = ['video_from', 'embed_video_id', 'virtual_tour'];

const inputs = inputList.reduce((obj, item) => {
  obj[item] = item;
  return obj;
}, {});

const MediaForm = ({ value, setValue }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <ResponsiveForm
      onSubmit={(e) => {
        e.preventDefault();
        navigate(formNext(pathname));
      }}
    >
      <MediaInput className="col-span-full" value={value} setValue={setValue} />
      <Select
        name={inputs.video_from}
        options={[
          {
            label: 'youtube',
            value: 'youtube',
          },
        ]}
        label={inputs.video_from}
        value={value.video_from}
        onChange={(e) => {
          setValue(inputs.video_from, e.target.value);
        }}
      />
      <Input
        type="text"
        name={inputs.embed_video_id}
        label={inputs.embed_video_id}
        value={value.embed_video_id}
        onChange={(e) => {
          setValue(inputs.embed_video_id, e.target.value);
        }}
      />
      <Input
        type="url"
        name={inputs.virtual_tour}
        label={inputs.virtual_tour}
        value={value.virtual_tour}
        onChange={(e) => {
          setValue(inputs.virtual_tour, e.target.value);
        }}
        placeholder="https://www.youtube.com/channel/UCwvj_fVMtGYk8J5-8bhmH8A"
      />
      <div className="col-span-full flex flex-wrap gap-4 sm:gap-6">
        <div className="basis-96 flex-grow">
          <PropertiesFormTitle>Interior</PropertiesFormTitle>
          <MediaInput value={value} setValue={setValue} className="mt-2" />
          <PropertiesFormTitle>Interior Description</PropertiesFormTitle>
          <Textarea name={inputs.virtual_tour} />
        </div>
        <div className="basis-96 flex-grow">
          <PropertiesFormTitle>Exterior</PropertiesFormTitle>
          <MediaInput value={value} setValue={setValue} className="mt-2" />
          <PropertiesFormTitle>Exterior Description</PropertiesFormTitle>
          <Textarea name={inputs.virtual_tour} />
        </div>
      </div>
      <div className="col-span-full">
        <PropertiesFormTitle>Upload Brochure</PropertiesFormTitle>
        <MediaInput value={value} setValue={setValue} className="mt-2" />
      </div>
      <PrevAndNext back={formBack(pathname)} />
    </ResponsiveForm>
  );
};

export default MediaForm;
