import React from 'react';
import { twMerge } from 'tailwind-merge';

const InputError = ({ error, className = "" }) => {
    return (
        <>
            {error && <span className={twMerge("text-sm text-red-700 px-2", className)}>{error}</span>}
        </>
    );
};

export default InputError;
