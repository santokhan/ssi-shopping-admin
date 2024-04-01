const SelectInput = (props) => {
    const { label, options } = props;
    
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={label} className="font-medium">
                {label}
            </label>
            <select
                {...props}
                className="w-full border rounded-lg px-2 py-2"
            >
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectInput;