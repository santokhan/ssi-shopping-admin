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
                    <AgentImageInput />
                </InputBox>
                <Input
                    label="Display Name"
                    type="text"
                    name="display_name"
                    className=''
                    placeholder=""
                />
                <Input
                    label="Email"
                    type="email"
                    name="email"
                    className=''
                    placeholder="Enter Email"
                />
                <Input
                    label="phone"
                    type="text"
                    name="phone"
                    className=''
                    placeholder=""
                />
                <Input
                    label="first name"
                    type="text"
                    name="first_name"
                    className=''
                    placeholder=""
                />
                <Input
                    label="last name"
                    type="text"
                    name="last_name"
                    className=''
                    placeholder=""
                />
                <Input
                    label="whatsapp number"
                    type="text"
                    name="whatsapp"
                    className=''
                    placeholder=""
                />
                <Input
                    label="speaks"
                    type="text"
                    name="speaks"
                    className=""
                    placeholder=""
                />
                <Input
                    label="location"
                    type="text"
                    name="location"
                    className=""
                    placeholder=""
                />
                <Input
                    label="location"
                    type="text"
                    name="location"
                    className=""
                    placeholder=""
                />
                <Input
                    label="Years of Expertise"
                    type="text"
                    name=""
                    className=""
                    placeholder=""
                />
                <Input
                    label="Category"
                    type="text"
                    name=""
                    className=""
                    placeholder=""
                />
                <Input
                    label="Nationality"
                    type="text"
                    name=""
                    className=""
                    placeholder=""
                />
                <Input
                    label="Status"
                    type="text"
                    name=""
                    className=""
                    placeholder=""
                />
                <Select
                    name="status"
                    options={[
                        {
                            label: "Active",
                            value: "active",
                        },
                        {
                            label: "Inactive",
                            value: "inactive",
                        },
                    ]}
                    label="Status"
                />
                <Textarea
                    label="About"
                    name="about"
                    className="col-span-full"
                />
                <div className={twMerge('col-span-full flex justify-end gap-2')}>
                    <SubmitButton>Submit</SubmitButton>
                </div>
            </ResponsiveForm>
        </div>
    );
};

export default AgentForm;
