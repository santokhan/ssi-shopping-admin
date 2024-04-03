import { Trash } from 'iconsax-react';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import Button from '../../components/Button';
import InputBox from '../../components/form/InputBox';
import ResponsiveForm from '../../components/form/ResponsiveForm'
import Textarea from '../../components/form/input/Textarea'
import FormTitle from '../../components/form/FormTitle';
import Input from '../../components/form/input/Input';
import Select from '../../components/form/input/SelectOption';
import SubmitButton from '../../components/form/SubmitButton';

const ImageInput = ({ agent }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        // Your file upload handling logic here
        console.log(event.target.files[0]);
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };
    
    if (!agent) {
        return null;
    }

    return (
        <div className="flex items-end gap-4 rounded-lg text-gray-800">
            <div className="h-24 w-24 sm:h-32 sm:w-32 flex-shrink-0 relative">
                <button className="absolute top-1 sm:top-2 left-1 sm:left-2 w-6 sm:w-8 h-6 sm:h-8 bg-white rounded-md flex justify-center items-center hover:text-red-500">
                    <Trash className="w-3 sm:w-4 h-3 sm:h-4" />
                </button>
                <img src={agent.photo} alt="" className="w-full h-full object-cover rounded-xl border bg-gray-50" />
            </div>
            <div className='space-y-2'>
                <div>
                    <Button onClick={handleButtonClick} variant="outline" withIcon={true}>Upload Profile</Button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        accept=".png,.jpg,.jpeg,.webp,.giff"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                </div>
                <p>{"Photos must be JPEG or PNG format and least 2048x2048"}</p>
            </div>
        </div>
    )
}

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
                    <ImageInput agent={{
                        photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
                        display_name: 'Jane Cooper',
                        category: 'Real Estate Agent',
                    }} />
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
