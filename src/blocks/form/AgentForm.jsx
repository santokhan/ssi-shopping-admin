import React from 'react';
import { useForm } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import InputBox from '../../components/form/InputBox';
import ResponsiveForm from '../../components/form/ResponsiveForm';
import Textarea from '../../components/form/input/Textarea'
import FormTitle from '../../components/form/FormTitle';
import Input from '../../components/form/input/Input';
import Select from '../../components/form/input/SelectOption';
import SubmitButton from '../../components/form/SubmitButton';
import AgentImageInput from '../../components/form/input/AgentImageInput';
import MultipleSelect, { initialCategory } from '../../components/form/input/MultipleSelect';


const AgentForm = () => {
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = (data) => {
        console.log(data); // Handle form submission here
    };

    return (
        <div className="bg-white rounded-xl p-4 lg:p-6">
            <ResponsiveForm onSubmit={handleSubmit(onSubmit)} className='!mt-0'>
                <InputBox className={"col-span-full pb-2"}>
                    <FormTitle>Photo</FormTitle>
                    <AgentImageInput src={"https://picsum.photos/200"} />
                </InputBox>
                <Input
                    label="display name"
                    type="text"
                    name="display_name"
                    className=''
                    placeholder="display name"
                />
                <Input
                    label="email"
                    type="email"
                    name="email"
                    className=''
                    placeholder="someone@gmail.com"
                />
                <Input
                    label="phone"
                    type="text"
                    name="phone"
                    className=""
                    placeholder="phone"
                />
                <Input
                    label="first name"
                    type="text"
                    name="first_name"
                    className=''
                    placeholder="first name"
                />
                <Input
                    label="last name"
                    type="text"
                    name="last_name"
                    className=""
                    placeholder="last name"
                />
                <Input
                    label="whatsapp number"
                    type="text"
                    name="whatsapp_number"
                    className=""
                    placeholder="whatsapp number"
                />
                <Input
                    label="speaks"
                    type="text"
                    name="speaks"
                    className=""
                    placeholder="speaks"
                />
                <Input
                    label="location"
                    type="text"
                    name="location"
                    className=""
                    placeholder="dubai"
                />
                <Input
                    label="years of expertise"
                    type="number"
                    name="years_of_expertise"
                    className=""
                    placeholder="10"
                />
                <MultipleSelect
                    name="category"
                    label="category"
                    categories={initialCategory}
                    onSelect={(category) => { 
                        // append to FormData object
                    }}
                />
                <Input
                    label="nationality"
                    type="text"
                    name="nationality"
                    className=""
                    placeholder="indian"
                />
                <Select
                    name="status"
                    options={[
                        {
                            label: "active",
                            value: "active",
                        },
                        {
                            label: "inactive",
                            value: "inactive",
                        },
                    ]}
                    label="status"
                />
                <Textarea
                    label="about"
                    name="about"
                    className="col-span-full"
                    placeholder="There are many variations of passages."
                />
                <div className={twMerge('col-span-full flex justify-end gap-2')}>
                    <SubmitButton>Submit</SubmitButton>
                </div>
            </ResponsiveForm>
        </div>
    );
};

export default AgentForm;
