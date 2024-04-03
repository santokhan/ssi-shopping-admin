import { useForm } from "react-hook-form";
import CancelOrSubmit from "../../../components/form/CancelOrSubmit";
import { useNavigate } from "react-router-dom";
import Select from "../../../components/form/input/SelectOption";
import Input from "../../../components/form/input/Input";
import Textarea from "../../../components/form/input/Textarea";
import MediaInput from "../../../components/form/input/MediaInput";
import ResponsiveForm from "../../../components/form/ResponsiveForm";
import PropertiesFormTitle from "../../../components/form/PropertiesFormTitle";

const MediaForm = () => {
    const { register, handleSubmit, errors } = useForm();
    const navigate = useNavigate()

    const onSubmit = (data) => {
        console.log(data); // Handle form submission here

        navigate("/properties/create/location")
    };

    return (
        <ResponsiveForm onSubmit={handleSubmit(onSubmit)}>
            <MediaInput className="col-span-full" />
            <div className="col-span-full pt-3">
                <PropertiesFormTitle>Video Option</PropertiesFormTitle>
            </div>
            <Select
                name="videoFrom"
                register={register}
                options={[
                    {
                        label: "youtube",
                        value: "youtube",
                    },
                    {
                        label: "youtube",
                        value: "youtube",
                    },
                ]}
                label="video from"
                className=""
            />
            <Input
                type="number"
                name="embed_video_id"
                register={register}
                className={""}
                placeholder="Your Name"
                label={"Embed Video id"}
            />
            <div className="col-span-full pt-3">
                <PropertiesFormTitle>Virtual Tour</PropertiesFormTitle>
            </div>
            <Input
                type="text"
                name="virtual_tour"
                register={register}
                className={""}
                placeholder="Your Name"
                label={"virtual tour"}
            />
            <CancelOrSubmit />
        </ResponsiveForm>
    );
};

export default MediaForm;