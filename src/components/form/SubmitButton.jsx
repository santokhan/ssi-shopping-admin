import { twMerge } from "tailwind-merge";
import Button from "../Button";

const SubmitButton = ({ children }) => {
    return (
        <Button
            type="submit"
            withIcon={true}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
        >
            {children || "Submit"}
        </Button>
    );
};

export const FinalSubmitButton = () => {
    return (
        <div className={twMerge('flex justify-between gap-2 mt-4')}>
            <div className=""></div>
            <SubmitButton />
        </div>
    );
};

export default SubmitButton;