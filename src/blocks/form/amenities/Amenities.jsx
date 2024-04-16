import { twMerge } from 'tailwind-merge';
import SubmitButton from '../../../components/form/SubmitButton';
import Input from '../../../components/form/input/Input';
import MediaInput from '../../../components/form/input/MediaInput';
import { useContext } from 'react';
import { AmenitiesContext } from '../../../context/amenities/amenities-context';
import useAxios from '../../../context/useAxios';
import { toast } from 'react-toastify';

const inputs = {
  title: 'title',
  icon: 'icon',
};

const CreateAmenities = ({ className = '' }) => {
  const { value, setValue, refetch } = useContext(AmenitiesContext);
  const { api } = useAxios();

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .post('amenities/', new FormData(e.target), {
        header: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        toast(`Amenities Added`, {
          type: 'success',
        });

        // refetch table
        refetch();

        // reset
        setValue(inputs.title, '');
        setValue(inputs.icon, '');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={twMerge('bg-white p-4 lg:p-6', className)}>
      <form className="space-y-4 lg:space-y-6" onSubmit={handleSubmit}>
        <Input
          label={inputs.title}
          type="text"
          className="w-full"
          onChange={(e) => {
            setValue(inputs.title, e.target.value);
          }}
          value={value[inputs.title]}
          name={inputs.title}
          required
        />
        <MediaInput
          value={value}
          inputName="icon"
          setValue={(name, value) => {
            setValue(name, value);
          }}
          className=""
          required
        />
        <div className="">
          <SubmitButton type="submit" className="" />
        </div>
      </form>
    </div>
  );
};

const EditAmenities = ({ className = '' }) => {
  const { value, setValue, refetch } = useContext(AmenitiesContext);
  const { api } = useAxios();

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .patch(`amenities/${'edit_id'}`, new FormData(e.target), {
        header: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        toast(`Amenities Added`, {
          type: 'success',
        });

        // refetch table
        refetch();

        // reset
        setValue(inputs.title, '');
        setValue(inputs.icon, '');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={twMerge('bg-white p-4 lg:p-6', className)}>
      <form className="space-y-4 lg:space-y-6" onSubmit={handleSubmit}>
        <Input
          label={inputs.title}
          type="text"
          className="w-full"
          onChange={(e) => {
            setValue(inputs.title, e.target.value);
          }}
          value={value[inputs.title]}
          name={inputs.title}
          required
        />
        <MediaInput
          value={value}
          inputName="icon"
          setValue={(name, value) => {
            setValue(name, value);
          }}
          className=""
          required={true}
        />
        <div className="">
          <SubmitButton type="submit" className="" />
        </div>
      </form>
    </div>
  );
};

const AmenitiesForm = ({ type = 'create', className = '' }) => {
  return (
    <>
      {type === 'create' && <CreateAmenities className={className} />}
      {type === 'edit' && <EditAmenities className={className} />}
    </>
  );
};

export default AmenitiesForm;
