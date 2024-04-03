import React from 'react';

const ResponsiveForm = ({ onSubmit, children }) => {
    return (
        <form
            onSubmit={onSubmit}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 lg:gap-x-6 mt-8"
        >
            {children}
        </form>
    );
};

export default ResponsiveForm;
