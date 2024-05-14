import { twMerge } from 'tailwind-merge';
import SubmitButton from '../../../components/form/SubmitButton';
import Input from '../../../components/form/input/Input';
import { useContext, useEffect } from 'react';
import useAxios from '../../../context/useAxios';
import { useNavigate, useParams } from 'react-router-dom';
import FormTitle from '../../../components/form/FormTitle';
import BackAnchor from '../../../components/BackAnchor';
import { TestiFormContext } from '../../../context/testimonials/TestiFormContext';
import Textarea from '../../../components/form/input/Textarea';
import InputFileSingle from '../../../components/form/input/InputFileSingle';
import { BlogFormContext } from '../../../context/BlogsFormContext';

const inputs = {
  title: 'title',
  description: 'description',
  image: 'image',
  author: 'author',
  rating: 'rating',
};

const BlogForm = () => {
  const { value, setTestiFormValue } = useContext(BlogFormContext);
  const { api } = useAxios();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    function getTestimonial(id) {
      if (id) {
        api
          .get(`testimonials/${id}/`)
          .then((res) => {
            if (res?.data) {
              const {
                title = '',
                description = '',
                image = '',
                author = '',
                rating = 5,
              } = res.data;

              const data = {
                title,
                description,
                image,
                author,
                rating,
              };

              for (const key in data) {
                if (Object.hasOwnProperty.call(data, key)) {
                  setTestiFormValue(key, data[key]);
                }
              }
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }

    if (id) {
      getTestimonial(id);
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      api
        .patch(`testimonials/${id}/`, new FormData(e.target), {
          header: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          navigate('/testimonials');
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .post('testimonials/', new FormData(e.target), {
          header: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          navigate('/testimonials');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className={twMerge('w-full bg-white p-4 lg:p-6 space-y-4 max-w-2xl')}>
      <div className="flex items-center gap-2">
        {id && <BackAnchor to="/testimonials" />}
        <FormTitle className="capitalize">
          {id ? 'edit' : 'create'} testimonial
        </FormTitle>
      </div>
      <form className="space-y-4 lg:space-y-6" onSubmit={handleSubmit}>
        <Input
          label={inputs.title}
          type="text"
          className="w-full"
          onChange={(e) => {
            setTestiFormValue(inputs.title, e.target.value);
          }}
          value={value[inputs.title]}
          name={inputs.title}
          required
        />
        <Textarea
          label={inputs.description}
          className="w-full"
          onChange={(e) => {
            setTestiFormValue(inputs.description, e.target.value);
          }}
          value={value[inputs.description]}
          name={inputs.description}
        />
        <Input
          label={inputs.author}
          type="text"
          className="w-full"
          onChange={(e) => {
            setTestiFormValue(inputs.author, e.target.value);
          }}
          value={value[inputs.author]}
          name={inputs.author}
        />
        <InputFileSingle
          name={inputs.image}
          className="w-full"
          accept="image/*"
          setValue={setTestiFormValue}
          value={value[inputs.image]}
        />
        <div className="">
          <SubmitButton type="submit" className="" />
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
