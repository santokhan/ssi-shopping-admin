import { twMerge } from "tailwind-merge";
import SubmitButton from "./SubmitButton";

const CancelOrSubmit = () => {
    return (
        <div className={twMerge('flex justify-between gap-2 mt-4')}>
            <div className=""></div>
            {/* <Button variant="outline">Cancel</Button> */}
            <SubmitButton>Next Step</SubmitButton>
        </div>
    );
};

export default CancelOrSubmit;