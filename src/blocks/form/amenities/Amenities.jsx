import { twMerge } from 'tailwind-merge';
import SubmitButton from '../../../components/form/SubmitButton';
import Input from '../../../components/form/input/Input';
import MediaInput from '../../../components/form/input/MediaInput';
import { useContext, useEffect, useState } from 'react';
import { AmenitiesContext } from '../../../context/amenities/amenities-context';
import useAxios from '../../../context/useAxios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../../../components/loader/Spinner';
import BackAnchor from '../../../components/BackAnchor';

const inputs = {
  title: 'title',
  icon: 'icon',
};

const AmenitiesForm = ({ handleSubmit, type = 'create' }) => {
  const { value, setValue, refetch } = useContext(AmenitiesContext);

  return (
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
        inputName="icon"
        required={type === 'create'}
        setValue={(name, value) => {
          setValue(name, value);
        }}
        value={value}
        multiple={false}
        src={value.icon}
      />
      <div className="">
        <SubmitButton type="submit" className="" />
      </div>
    </form>
  );
};

export const CreateAmenities = () => {
  const { value, setValue, refetch } = useContext(AmenitiesContext);
  const { api } = useAxios();

  useEffect(() => {
    setValue(inputs.title, '');
    setValue(inputs.icon, '');
  }, []);

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
    <div className={twMerge('bg-white p-4 lg:p-6')}>
      <AmenitiesForm
        value={value}
        setValue={setValue}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export const EditAmenities = () => {
  const { value, setValue, refetch } = useContext(AmenitiesContext);
  const { api } = useAxios();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`amenities/${id}/`)
      .then((res) => {
        if (res.data) {
          const data = res.data;
          setValue(inputs.title, data.title);
          setValue(inputs.icon, data.icon);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .patch(`amenities/${id}/`, new FormData(e.target), {
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

        // redirect
        window.history.back();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={twMerge('bg-white p-4 lg:p-6 space-y-4')}>
          <div className="flex items-center gap-2">
            <BackAnchor to="/amenities" />
            <h5 className="text-lg font-semibold">Edit Form</h5>
          </div>
          <hr />
          <AmenitiesForm
            value={value}
            setValue={setValue}
            handleSubmit={handleSubmit}
          />
        </div>
      )}
    </>
  );
};
