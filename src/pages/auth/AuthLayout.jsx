import React from 'react';

const AuthLayout = ({ children }) => {
    return (
        <div className="bg-login min-h-screen bg-gray-50">
            <div className="max-w-screen-xl mx-auto px-4 py-12">
                {children}
            </div>
        </div>
    )
};

export default AuthLayout