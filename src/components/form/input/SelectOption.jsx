import InputBox from "../InputBox";
import Label from "./Label";

const Select = ({ label, options, className = "", ...props }) => {
    return (
        <InputBox>
            <Label label={label} />
            <select
                {...props}
                className="w-full border rounded-lg px-3 py-3"
            >
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </InputBox>
    );
};

export default Select;