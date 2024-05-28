import PrevAndNext from '../../../components/form/CancelOrSubmit';
import { useLocation, useNavigate } from 'react-router-dom';
import Select from '../../../components/form/input/SelectOption';
import Input from '../../../components/form/input/Input';
import MediaInput from '../../../components/form/input/MediaInput';
import ResponsiveForm from '../../../components/form/ResponsiveForm';
import PropertiesFormTitle from '../../../components/form/PropertiesFormTitle';
import { formBack, formNext } from '../../../utils/form-steps';
import useAxios from '../../../context/useAxios';
import { twMerge } from 'tailwind-merge';
import InputFile from '../../../components/form/input/InputFile';
import InputFileSingle from '../../../components/form/input/InputFileSingle';

const inputList = ['video_from', 'embed_video_id', 'virtual_tour'];

const Box = ({ children, className }) => (
  <div className={twMerge('basis-96 flex-grow space-y-2', className)}>
    {children}
  </div>
);

const GridSpanFull = ({ children, className }) => (
  <div
    className={twMerge(
      'col-span-full flex flex-wrap gap-4 sm:gap-6',
      className,
    )}
  >
    {children}
  </div>
);

const inputs = inputList.reduce((obj, item) => {
  obj[item] = item;
  return obj;
}, {});

const MediaForm = ({ value, setValue = (key = '', value = []) => {} }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { api } = useAxios();

  const onRemoveFromServer = async (id) => {
    if (id) {
      try {
        const res = await api.delete(`property_gallery/${id}/delete/`);

        // remove from the state after removed from the server
        if (res) {
          const images = value['images'];
          if (Array.isArray(images)) {
            setValue(
              'images',
              images.filter((_) => _.id !== id),
            );
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <ResponsiveForm
      onSubmit={(e) => {
        e.preventDefault();
        navigate(formNext(pathname));
      }}
    >
      <MediaInput
        className="col-span-full"
        value={value.images}
        setValue={setValue}
        onRemoveFromServer={onRemoveFromServer}
        reArrange={(lifted) => {
          console.log(lifted);
          api.post('update_gallery_order/', lifted).then((res) => {
            console.log(res.data);
          });
        }}
      />
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
      <GridSpanFull>
        <Box>
          <h5 className={'font-semibold capitalize'}>floor plan</h5>
          <InputFile
            name="floor_plan"
            value={value.floor_plan || ''}
            setValue={setValue}
            className="basis-96 flex-grow"
            accept="application/pdf"
            onRemove={() => {
              // remove from server
              // api call
            }}
          />
        </Box>
        <Box>
          <h5 className={'font-semibold'}>Floor Plan Thumbnail</h5>
          <InputFileSingle
            name="floor_plan_thumbnail"
            value={value.floor_plan_thumbnail}
            setValue={setValue}
            className="basis-96 flex-grow"
            accept="image/*"
          />
        </Box>
      </GridSpanFull>
      <PrevAndNext back={formBack(pathname)} />
    </ResponsiveForm>
  );
};

export default MediaForm;
