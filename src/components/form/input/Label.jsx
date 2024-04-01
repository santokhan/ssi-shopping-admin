const Label = ({ label }) => {
    return (
        <label
            htmlFor={label}
            className="font-semibold capitalize"
        >
            {label}
        </label>
    );
};

export default Label;