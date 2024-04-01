import { twMerge } from "tailwind-merge";

const InputBox = ({ children, className }) => {
    return <div className={twMerge('space-y-1', className)}>{children}</div>;
};

export default InputBox;