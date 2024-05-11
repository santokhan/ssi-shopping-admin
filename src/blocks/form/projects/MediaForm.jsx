import PrevAndNext from '../../../components/form/CancelOrSubmit';
import { useLocation, useNavigate } from 'react-router-dom';
import Select from '../../../components/form/input/SelectOption';
import Input from '../../../components/form/input/Input';
import MediaInput from '../../../components/form/input/MediaInput';
import InputFileSingle from '../../../components/form/input/InputFileSingle';
import ResponsiveForm from '../../../components/form/ResponsiveForm';
import { formBack, formNext } from '../../../utils/form-steps';
import Textarea from '../../../components/form/input/Textarea';
import { twMerge } from 'tailwind-merge';
import useAxios from '../../../context/useAxios';
import InputFile from '../../../components/form/input/InputFile';

const inputs = {
  images: 'images',
  video_from: 'video_from',
  embed_video_id: 'embed_video_id',
  virtual_tour: 'virtual_tour',
  interior_images: 'interior_images',
  interior_description: 'interior_description',
  exterior_images: 'exterior_images',
  exterior_description: 'exterior_description',
  brochure: 'brochure',
  brochure_thumbnail: 'brochure_thumbnail',
};

const MediaForm = ({ value, setValue }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { api } = useAxios();

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

  return (
    <ResponsiveForm
      onSubmit={(e) => {
        e.preventDefault();
        navigate(formNext(pathname));
      }}
    >
      <MediaInput
        name={inputs.images}
        className="col-span-full"
        value={value.images}
        setValue={setValue}
        onRemoveFromServer={(id) => {
          api
            .delete(`project_galleries/${id}/`)
            .then((res) => {
              if (res) {
                setValue(
                  'images',
                  value[inputs.images].filter((_) => _.id !== id),
                );
              }
            })
            .catch((error) => {
              console.error(error);
            });
        }}
      />
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
      <GridSpanFull>
        <Box>
          <h5 className={'font-semibold'}>Upload Interior Image</h5>
          <MediaInput
            name={inputs.interior_images}
            value={value.interior_images}
            setValue={setValue}
          />
          <h5 className={'font-semibold'}>Interior Description</h5>
          <Textarea
            name={'interior_description'}
            value={value.interior_description}
          />
        </Box>
        <Box>
          <h5 className={'font-semibold'}>Upload Exterior Image</h5>
          <MediaInput
            name={'exterior_images'}
            value={value.exterior_images}
            setValue={setValue}
          />
          <h5 className={'font-semibold'}>Exterior Description</h5>
          <Textarea
            name={'exterior_description'}
            value={value.exterior_description}
          />
        </Box>
      </GridSpanFull>
      <GridSpanFull>
        <Box>
          <h5 className={'font-semibold'}>Upload Brochure</h5>
          <InputFile
            name="brochure"
            value={value.brochure}
            setValue={setValue}
            className="basis-96 flex-grow"
            accept=".pdf"
            onRemove={() => {
              // remove from server
              // api call
            }}
          />
        </Box>
        <Box>
          <h5 className={'font-semibold'}>Upload Brochure Thumbnail</h5>
          <InputFileSingle
            name="brochure_thumbnail"
            value={value.brochure_thumbnail}
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
