import { useForm } from "react-hook-form";
import CancelOrSubmit from "../../../components/form/CancelOrSubmit";
import { useNavigate } from "react-router-dom";
import Select from "../../../components/form/input/SelectOption";
import Input from "../../../components/form/input/Input";
import Textarea from "../../../components/form/input/Textarea";
import ResponsiveForm from "../../../components/form/ResponsiveForm";

const DetailsForm = () => {
    const { register, handleSubmit, errors } = useForm();
    const navigate = useNavigate()

    const onSubmit = (data) => {
        console.log(data); // Handle form submission here

        navigate("/properties/create/amenities")
    };

    return (
        <ResponsiveForm onSubmit={handleSubmit(onSubmit)}>
            <Input
                type="text"
                name="title"
                register={register}
                className={""}
                label={"Size in ft (only numbers)"}
            />
            <Input
                type="text"
                name="title"
                register={register}
                className={""}
                label={"Suitable"}
            />
            <Input
                type="text"
                name="title"
                register={register}
                className={""}
                label={"Type"}
            />
            <Input
                type="text"
                name="title"
                register={register}
                className={""}
                label={"Bedrooms"}
            />
            <Input
                type="text"
                name="title"
                register={register}
                className={""}
                label={"Bathrooms"}
            />
            <Input
                type="text"
                name="title"
                register={register}
                className={""}
                label={"Parking"}
            />
            <Input
                type="text"
                name="title"
                register={register}
                className={""}
                label={"Garage size"}
            />
            <Input
                type="text"
                name="title"
                register={register}
                className={""}
                label={"Year built (numeric)"}
            />
            <Input
                type="text"
                name="title"
                register={register}
                className={""}
                label={"Available from (date)"}
            />
            <Input
                type="text"
                name="title"
                register={register}
                className={""}
                label={"Basement"}
            />
            <Input
                type="text"
                name="title"
                register={register}
                className={""}
                label={"Extra details"}
            />
            <Input
                type="text"
                name="title"
                register={register}
                className={""}
                label={"Roofing"}
            />
            <Input
                type="text"
                name="title"
                register={register}
                className={""}
                label={"Exterior Material"}
            />
            <Input
                type="text"
                name="title"
                register={register}
                className={""}
                label={"Structure type"}
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
                label="Floors no"
                className=""
            />
            <Textarea
                label={"Owner/ Agent nots (not visible on front end)"}
                name="description"
                register={register}
                placeholder="There are many variations of passages."
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
                label="Energy Class"
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
                label="Energy index in kWh/m2a"
                className=""
            />
            <CancelOrSubmit />
        </ResponsiveForm>
    );
};

export default DetailsForm;