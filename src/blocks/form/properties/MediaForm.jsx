import PrevAndNext from '../../../components/form/CancelOrSubmit';
import { useNavigate } from 'react-router-dom';
import Select from '../../../components/form/input/SelectOption';
import Input from '../../../components/form/input/Input';
import MediaInput from '../../../components/form/input/MediaInput';
import ResponsiveForm from '../../../components/form/ResponsiveForm';
import PropertiesFormTitle from '../../../components/form/PropertiesFormTitle';
import { formBack, formNext } from '../../../utils/form-steps';

const inputList = ['video_from', 'embed_video_id', 'virtual_tour'];

const inputs = inputList.reduce((obj, item) => {
  obj[item] = item;
  return obj;
}, {});

const MediaForm = ({ value, setValue }) => {
  const navigate = useNavigate();
  const thisFormName = 'media';

  return (
    <ResponsiveForm
      onSubmit={(e) => {
        e.preventDefault();

        navigate(formNext(thisFormName));
      }}
    >
      <MediaInput className="col-span-full" value={value} setValue={setValue} />
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
        ]}
        label={inputs.video_from}
        value={value.video_from}
        onChange={(e) => {
          setValue(inputs.video_from, e.target.value);
        }}
        required
      />
      <Input
        type="text"
        name={inputs.embed_video_id}
        label={inputs.embed_video_id}
        value={value.embed_video_id}
        onChange={(e) => {
          setValue(inputs.embed_video_id, e.target.value);
        }}
        required
      />
      <div className="col-span-full pt-3">
        <PropertiesFormTitle>Virtual Tour</PropertiesFormTitle>
      </div>
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
      <PrevAndNext
        onBack={() => {
          navigate(formBack(thisFormName));
        }}
      />
    </ResponsiveForm>
  );
};

export default MediaForm;
