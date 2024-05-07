import PrevAndNext from '../../../components/form/CancelOrSubmit';
import { useLocation, useNavigate } from 'react-router-dom';
import Select from '../../../components/form/input/SelectOption';
import Input from '../../../components/form/input/Input';
import MediaInput from '../../../components/form/input/MediaInput';
import InputFileSIngle from '../../../components/form/input/InputFileSIngle';
import ResponsiveForm from '../../../components/form/ResponsiveForm';
import { formBack, formNext } from '../../../utils/form-steps';
import Textarea from '../../../components/form/input/Textarea';
import { twMerge } from 'tailwind-merge';

const inputs = {
  images: 'images',
  video_from: 'video_from',
  embed_video_id: 'embed_video_id',
  virtual_tour: 'virtual_tour',
  interior_image: 'interior_image',
  interior_description: 'interior_description',
  exterior_image: 'exterior_image',
  exterior_description: 'exterior_description',
  brochure: 'brochure',
  brochure_thumbnail: 'brochure_thumbnail',
};

const MediaForm = ({ value, setValue }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

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
        value={value}
        setValue={setValue}
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
          <InputFileSIngle
            name="interior_image"
            value={value.interior_image}
            setValue={setValue}
          />
          <h5 className={'font-semibold'}>Interior Description</h5>
          <Textarea name={inputs.virtual_tour} />
        </Box>
        <Box>
          <h5 className={'font-semibold'}>Upload Exterior Image</h5>
          <InputFileSIngle
            name="exterior_image"
            value={value.exterior_image}
            setValue={setValue}
          />
          <h5 className={'font-semibold'}>Exterior Description</h5>
          <Textarea name={inputs.virtual_tour} />
        </Box>
      </GridSpanFull>
      <GridSpanFull>
        <Box>
          <h5 className={'font-semibold'}>Upload Brochure</h5>
          <InputFileSIngle
            name="brochure"
            value={value.brochure}
            setValue={setValue}
            className="basis-96 flex-grow"
            accept=".pdf"
          />
        </Box>
        <Box>
          <h5 className={'font-semibold'}>Upload Brochure Thumbnail</h5>
          <InputFileSIngle
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
