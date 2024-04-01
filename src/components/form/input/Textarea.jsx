import { twMerge } from "tailwind-merge";
import InputBox from "../InputBox";
import Label from "./Label";

const Textarea = ({ label, className = "", name, rows = 5, cols = 2, ...props }) => {
    return (
        <InputBox className={twMerge('sm:cols-span-2 lg:col-span-3', className)}>
            <Label>
                <span className="font-semibold capitalize">{label}</span>
                <textarea
                    id={name}
                    name={name}
                    className='w-full border rounded-lg px-4 py-2.5'
                    cols={cols}
                    rows={rows}
                    {...props}
                ></textarea>
            </Label>
        </InputBox>
    );
};

export default Textarea;