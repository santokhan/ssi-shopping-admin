import { useForm } from "react-hook-form";
import CancelOrSubmit from "../../../components/form/CancelOrSubmit";
import InputBox from "../../../components/form/InputBox";
import { useNavigate } from "react-router-dom";

const DetailsForm = () => {
    const { register, handleSubmit, errors } = useForm();
    const navigate = useNavigate()

    const onSubmit = (data) => {
        console.log(data); // Handle form submission here
        
        navigate("/properties/create/amenities")
    };


    return (
        <form className='' onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                <InputBox>
                    <label className="block font-medium">Display Name</label>
                    <input type="text" name="displayName" className='w-full border rounded-lg px-2 py-2' />
                </InputBox>
                <InputBox>
                    <label className="block font-medium">Email</label>
                    <input type="email" name="email" className='w-full border rounded-lg px-2 py-2' />
                </InputBox>
                <InputBox>
                    <label className="block font-medium">Phone</label>
                    <input type="text" name="phone" className='w-full border rounded-lg px-2 py-2' />
                </InputBox>
                <InputBox>
                    <label className="block font-medium">First Name</label>
                    <input type="text" name="firstName" className='w-full border rounded-lg px-2 py-2' />
                </InputBox>
                <InputBox>
                    <label className="block font-medium">Last Name</label>
                    <input type="text" name="lastName" className='w-full border rounded-lg px-2 py-2' />
                </InputBox>
                <InputBox>
                    <label className="block font-medium">WhatsApp Number</label>
                    <input type="text" name="whatsAppNumber" className='w-full border rounded-lg px-2 py-2' />
                </InputBox>
                <InputBox>
                    <label className="block font-medium">Speaks</label>
                    <input type="text" name="speaks" className='w-full border rounded-lg px-2 py-2' />
                </InputBox>
                <InputBox>
                    <label className="block font-medium">Location</label>
                    <input type="text" name="location" className='w-full border rounded-lg px-2 py-2' />
                </InputBox>
                <InputBox>
                    <label className="block font-medium">Years of Expertise</label>
                    <input type="number" name="yearsOfExpertise" className='w-full border rounded-lg px-2 py-2' />
                </InputBox>
                <InputBox>
                    <label className="block font-medium">Category</label>
                    <input type="text" name="category" className='w-full border rounded-lg px-2 py-2' />
                </InputBox>
                <InputBox>
                    <label className="block font-medium">Nationality</label>
                    <input type="text" name="nationality" className='w-full border rounded-lg px-2 py-2' />
                </InputBox>
                <InputBox>
                    <label className="block font-medium">Status</label>
                    <select name="status" className='w-full border rounded-lg px-2 py-2'>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </InputBox>
            </div>
            <InputBox className={'mt-4'}>
                <label className="block font-medium">About</label>
                <textarea className='w-full border rounded-lg px-2 py-2' cols={2} rows={5}></textarea>
            </InputBox>
            <CancelOrSubmit />
        </form>
    );
};

export default DetailsForm;