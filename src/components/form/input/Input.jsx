import { twMerge } from "tailwind-merge";
import Label from "./Label";
import InputBox from "../InputBox";

export const InputElement = ({ label, type = "text", ...props }) => {
    return (
        <input
            type={type}
            {...props}
            className='w-full border rounded-lg px-4 py-2.5'
        />
    );
};

const Input = ({ label, type = "text", className = "", ...props }) => {
    return (
        <InputBox className={twMerge(className)}>
            <Label label={label} />
            <InputElement label={label} type={type} {...props} />
        </InputBox>
    );
};

export default Input;