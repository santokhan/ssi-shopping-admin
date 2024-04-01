import { useForm } from "react-hook-form";
import CancelOrSubmit from "../../../components/form/CancelOrSubmit";
import { useNavigate } from "react-router-dom";
import Select from "../../../components/form/input/SelectOption";
import Input from "../../../components/form/input/Input";
import Textarea from "../../../components/form/input/Textarea";

const DetailsForm = () => {
    const { register, handleSubmit, errors } = useForm();
    const navigate = useNavigate()

    const onSubmit = (data) => {
        console.log(data); // Handle form submission here

        navigate("/properties/create/amenities")
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 lg:gap-x-6 mt-8"
        >
            <Input
                type="text"
                name="title"
                register={register}
                className={"col-span-full"}
                label={"title"}
            />
            <Select
                name="category"
                register={register}
                options={[
                    {
                        label: "Real Estate Agent",
                        value: "Real Estate Agent",
                    },
                    {
                        label: "Real Estate Agent",
                        value: "Real Estate Agent",
                    },
                ]}
                label="Category"
                className=""
            />
            <Select
                name="category"
                register={register}
                options={[
                    {
                        label: "Real Estate Agent",
                        value: "Real Estate Agent",
                    },
                    {
                        label: "Real Estate Agent",
                        value: "Real Estate Agent",
                    },
                ]}
                label="Category"
                className=""
            />
            <Select
                name="category"
                register={register}
                options={[
                    {
                        label: "Real Estate Agent",
                        value: "Real Estate Agent",
                    },
                    {
                        label: "Real Estate Agent",
                        value: "Real Estate Agent",
                    },
                ]}
                label="Category"
                className=""
            />
            <Select
                name="category"
                register={register}
                options={[
                    {
                        label: "Real Estate Agent",
                        value: "Real Estate Agent",
                    },
                    {
                        label: "Real Estate Agent",
                        value: "Real Estate Agent",
                    },
                ]}
                label="Category"
                className=""
            />
           <Textarea
                label={"description"}
                name="description"
                register={register}
                className="sm:cols-span-2 lg:col-span-3"
            />
            <Select
                name="category"
                register={register}
                options={[
                    {
                        label: "Real Estate Agent",
                        value: "Real Estate Agent",
                    },
                    {
                        label: "Real Estate Agent",
                        value: "Real Estate Agent",
                    },
                ]}
                label="Category"
                className=""
            />
            <Select
                name="category"
                register={register}
                options={[
                    {
                        label: "Real Estate Agent",
                        value: "Real Estate Agent",
                    },
                    {
                        label: "Real Estate Agent",
                        value: "Real Estate Agent",
                    },
                ]}
                label="Category"
                className=""
            />
            <CancelOrSubmit />
        </form>
    );
};

export default DetailsForm;