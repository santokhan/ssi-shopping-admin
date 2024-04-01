const Input = ({ label, type = "text", ...props }) => {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={label} className="font-medium">{label}</label>
            <input
                type={type}
                {...props}
                className='w-full border rounded-lg px-2 py-2'
            />
        </div>
    );
};

export default Input;