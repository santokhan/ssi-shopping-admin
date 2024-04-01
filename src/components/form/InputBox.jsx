import { twMerge } from "tailwind-merge";

const InputBox = ({ children, className }) => {
    return <div className={twMerge('flex flex-col gap-2', className)}>{children}</div>;
};

export default InputBox;