import React from 'react';
import { twMerge } from 'tailwind-merge';

const Button = ({ variant = 'primary', onClick, children, withIcon = false, type = 'button' }) => {
    let commonClasses = "relative flex items-center justify-center gap-1 text-sm lg:text-base rounded-xl px-4 lg:px-5 py-2 lg:py-2.5 font-medium";

    let buttonClassName = "";
    switch (variant) {
        case 'primary':
            buttonClassName += "bg-dark-blue-500 text-white hover:bg-dark-blue-400";
            break;
        case 'secondary':
            buttonClassName += "bg-gray-300 text-gray-900 hover:bg-gray-400";
            break;
        case 'outline':
            buttonClassName += "border border-gray-900 text-gray-900 hover:bg-gray-100";
            break;
        default:
            buttonClassName += "bg-gray-900 text-white"; // Default to variant1 styles
            break;
    }

    return (
        <button
            className={twMerge(buttonClassName, commonClasses)}
            onClick={onClick}
            type={type}
        >
            <span className="whitespace-nowrap">{children}</span>
            {
                withIcon &&
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
            }
        </button>
    );
};

export default Button;
