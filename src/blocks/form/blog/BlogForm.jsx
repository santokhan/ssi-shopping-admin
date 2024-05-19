import { twMerge } from 'tailwind-merge';
import SubmitButton from '../../../components/form/SubmitButton';
import Input from '../../../components/form/input/Input';
import { useContext, useEffect } from 'react';
import useAxios from '../../../context/useAxios';
import { useNavigate, useParams } from 'react-router-dom';
import FormTitle from '../../../components/form/FormTitle';
import BackAnchor from '../../../components/BackAnchor';
import Textarea from '../../../components/form/input/Textarea';
import InputFileSingle from '../../../components/form/input/InputFileSingle';
import { BlogFormContext } from '../../../context/BlogsFormContext';
import TagsInput from '../../../components/form/TagsInput';
import MyCKEditor from '../../../components/form/input/MyCKEditor';

const BlogForm = () => {
  const { value, setFormValue } = useContext(BlogFormContext);
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
                  setFormValue(key, data[key]);
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

    const encode = (value) => {
      const formData = new FormData();

      for (const key in value) {
        if (Object.hasOwnProperty.call(value, key)) {
          const ele = value[key];

          if (ele) {
            if (['tags', 'category'].includes(key)) {
              formData.append(key, JSON.stringify(ele));
            } else if (key === 'featured_image' && ele instanceof File) {
              formData.append(key, ele);
            } else {
              formData.append(key, ele);
            }
          }
        }
      }

      return formData;
    };

    if (id) {
      api
        .patch(`blogs/${id}/`, encode(value), {
          header: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          navigate('/news');
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .post('blogs/', encode(value), {
          header: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          navigate('/news');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  function assignValue(e) {
    if (e.target?.name) {
      setFormValue(e.target.name, e.target?.value);
    }
  }

  // console.log(value);

  return (
    <div className={twMerge('w-full bg-white p-4 lg:p-6 space-y-4')}>
      <div className="flex items-center gap-2">
        {id && <BackAnchor to="/testimonials" />}
        <FormTitle className="capitalize">
          {id ? 'edit' : 'create'} blog
        </FormTitle>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <h5 className="font-semibold capitalize">Blog Image</h5>
          <InputFileSingle
            name="featured_image"
            accept="image/*"
            setValue={setFormValue}
            value={value.featured_image}
            className="w-full"
          />
        </div>
        <div className="flex flex-wrap gap-4">
          <Input
            label="title"
            name="title"
            onChange={assignValue}
            value={value.title}
            required
            className="basis-96 sm:basis-[420px] flex-grow"
          />
          <Input
            label="sub_title"
            name="sub_title"
            onChange={assignValue}
            value={value.sub_title}
            required
            className="basis-96 sm:basis-[420px] flex-grow"
          />
          <Input
            label="author"
            onChange={assignValue}
            value={value.author}
            name="author"
            className="basis-96 sm:basis-[420px] flex-grow"
          />
          <TagsInput
            name="category"
            label="category"
            className="basis-96 sm:basis-[420px] flex-grow"
            valueFromServer={value.categories}
            setContextValue={assignValue}
          />
          <TagsInput
            name="tags"
            label="tags"
            className="basis-96 sm:basis-[420px] flex-grow"
            valueFromServer={value.tags}
            setContextValue={assignValue}
          />
          <Textarea
            label="description"
            name="description"
            onChange={assignValue}
            value={value.description}
            className="w-full"
          />
          <MyCKEditor name="post" value={value.post} setValue={setFormValue} />
        </div>
        <div className="w-full">
          <SubmitButton type="submit" className="" />
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
