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
import { ProjectFormContext } from '../../../context/project-form/ProjectFormContext';
import { useContext } from 'react';

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

const MediaForm = () => {
  const { setFormValue, value } = useContext(ProjectFormContext);
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
        setValue={setFormValue}
        onRemoveFromServer={(id) => {
          api
            .delete(`project_galleries/${id}/`)
            .then((res) => {
              if (res) {
                setFormValue(
                  'images',
                  value[inputs.images]?.filter((_) => _.id !== id),
                );
              }
            })
            .catch((error) => {
              console.error(error);
            });
        }}
        reArrange={(lifted) => {
          console.log(lifted);
          api.post('update_project_gallery_order/', lifted).then((res) => {
            console.log(res.data);
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
          setFormValue(inputs.video_from, e.target.value);
        }}
      />
      <Input
        type="text"
        name={inputs.embed_video_id}
        label={inputs.embed_video_id}
        value={value.embed_video_id}
        onChange={(e) => {
          setFormValue(inputs.embed_video_id, e.target.value);
        }}
      />
      <Input
        type="url"
        name={inputs.virtual_tour}
        label={inputs.virtual_tour}
        value={value.virtual_tour}
        onChange={(e) => {
          setFormValue(inputs.virtual_tour, e.target.value);
        }}
        placeholder="https://www.youtube.com/channel/UCwvj_fVMtGYk8J5-8bhmH8A"
      />
      <GridSpanFull>
        <Box>
          <h5 className={'font-semibold'}>Upload Interior Image</h5>
          <MediaInput
            name={inputs.interior_images}
            value={value.interior_images}
            setValue={setFormValue}
            onRemoveFromServer={(id) => {
              // remove from server
              api
                .delete(`project-interior-images/${id}/delete/`)
                .then(() => {
                  setFormValue(
                    'interior_images',
                    value.interior_images?.filter((_) => _.id !== id),
                  );
                })
                .catch((error) => {
                  console.error(error);
                });
            }}
          />
          <h5 className={'font-semibold'}>Interior Description</h5>
          <Textarea
            key={'interior_description'}
            name={'interior_description'}
            value={value.interior_description}
            onChange={(e) => {
              setFormValue('interior_description', e.target.value);
            }}
          />
        </Box>
        <Box>
          <h5 className={'font-semibold'}>Upload Exterior Image</h5>
          <MediaInput
            name={'exterior_images'}
            value={value.exterior_images}
            setValue={setFormValue}
            onRemoveFromServer={(id) => {
              // remove from server
              api
                .delete(`project-exterior-images/${id}/delete/`)
                .then((res) => {
                  setFormValue(
                    'exterior_images',
                    value.exterior_images?.filter((_) => _.id !== id),
                  );
                })
                .catch((error) => {
                  console.error(error);
                });
            }}
          />
          <h5 className={'font-semibold'}>Exterior Description</h5>
          <Textarea
            key={'exterior_description'}
            name={'exterior_description'}
            value={value.exterior_description}
            onChange={(e) => {
              setFormValue('exterior_description', e.target.value);
            }}
          />
        </Box>
      </GridSpanFull>
      <GridSpanFull>
        <Box>
          <h5 className={'font-semibold capitalize'}>Floor Plan</h5>
          <InputFile
            name="floor_plan"
            value={value.floor_plan || ''}
            setValue={setFormValue}
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
            setValue={setFormValue}
            className="basis-96 flex-grow"
            accept="image/*"
          />
        </Box>
      </GridSpanFull>
      <GridSpanFull>
        <Box>
          <h5 className={'font-semibold'}>Upload Brochure</h5>
          <InputFile
            name="brochure"
            value={value.brochure}
            setValue={setFormValue}
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
            setValue={setFormValue}
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
