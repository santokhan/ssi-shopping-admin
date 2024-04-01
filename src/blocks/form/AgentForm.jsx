import { Trash } from 'iconsax-react';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import Button from '../../components/Button';

const InputBox = ({ children, className }) => {
    return <div className={twMerge('space-y-1', className)}>{children}</div>;
};

const ImageInput = ({ agent }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    if (!agent) {
        return null;
    }

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        // Your file upload handling logic here
        console.log(event.target.files[0]);
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

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
            <form className='' onSubmit={handleSubmit(onSubmit)}>
                <InputBox>
                    <ImageInput agent={{
                        photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
                        display_name: 'Jane Cooper',
                        category: 'Real Estate Agent',
                    }} />
                </InputBox>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                    <InputBox>
                        <label className="block font-medium">Display Name</label>
                        <input type="text" name="displayName" className='w-full border rounded-lg px-2 py-1.5' />
                    </InputBox>
                    <InputBox>
                        <label className="block font-medium">Email</label>
                        <input type="email" name="email" className='w-full border rounded-lg px-2 py-1.5' />
                    </InputBox>
                    <InputBox>
                        <label className="block font-medium">Phone</label>
                        <input type="text" name="phone" className='w-full border rounded-lg px-2 py-1.5' />
                    </InputBox>
                    <InputBox>
                        <label className="block font-medium">First Name</label>
                        <input type="text" name="firstName" className='w-full border rounded-lg px-2 py-1.5' />
                    </InputBox>
                    <InputBox>
                        <label className="block font-medium">Last Name</label>
                        <input type="text" name="lastName" className='w-full border rounded-lg px-2 py-1.5' />
                    </InputBox>
                    <InputBox>
                        <label className="block font-medium">WhatsApp Number</label>
                        <input type="text" name="whatsAppNumber" className='w-full border rounded-lg px-2 py-1.5' />
                    </InputBox>
                    <InputBox>
                        <label className="block font-medium">Speaks</label>
                        <input type="text" name="speaks" className='w-full border rounded-lg px-2 py-1.5' />
                    </InputBox>
                    <InputBox>
                        <label className="block font-medium">Location</label>
                        <input type="text" name="location" className='w-full border rounded-lg px-2 py-1.5' />
                    </InputBox>
                    <InputBox>
                        <label className="block font-medium">Years of Expertise</label>
                        <input type="number" name="yearsOfExpertise" className='w-full border rounded-lg px-2 py-1.5' />
                    </InputBox>
                    <InputBox>
                        <label className="block font-medium">Category</label>
                        <input type="text" name="category" className='w-full border rounded-lg px-2 py-1.5' />
                    </InputBox>
                    <InputBox>
                        <label className="block font-medium">Nationality</label>
                        <input type="text" name="nationality" className='w-full border rounded-lg px-2 py-1.5' />
                    </InputBox>
                    <InputBox>
                        <label className="block font-medium">Status</label>
                        <select name="status" className='w-full border rounded-lg px-2 py-1.5'>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </InputBox>
                </div>
                <InputBox className={'mt-4'}>
                    <label className="block font-medium">About</label>
                    <textarea className='w-full border rounded-lg px-2 py-1.5' cols={2} rows={5}></textarea>
                </InputBox>
                <div className={twMerge('flex justify-end gap-2 mt-4')}>
                    <Button variant="outline">Cancel</Button>
                    <Button variant="primary">Submit</Button>
                </div>
            </form>
        </div>
    );
};

export default AgentForm;
