import React from 'react';
import { useForm } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

const InputBox = ({ children, className }) => {
    return <div className={twMerge('space-y-1', className)}>{children}</div>;
};

const AgentForm = () => {
    const { register, handleSubmit, errors } = useForm();

    return (
        <div className="bg-white rounded-xl p-4 lg:p-6">
            <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                <InputBox className={'md:col-span-2 lg:col-span-3'}>
                    <label className="block font-medium">About</label>
                    <textarea className='w-full border rounded-lg px-2 py-1.5' cols={2} rows={5}></textarea>
                </InputBox>
                <div className={twMerge('flex justify-end', 'md:col-span-2 lg:col-span-3')}>
                    <button type="button">Cancel</button>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default AgentForm;
