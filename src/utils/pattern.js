
const getPasswordWarnings = (password = '') => {
    const checks = [
        { regex: /(?=.*[a-z])/, message: "At least one lowercase letter." },
        { regex: /(?=.*[A-Z])/, message: "At least one uppercase letter." },
        { regex: /(?=.*\d)/, message: "At least one number." },
        { regex: /(?=.*[^a-zA-Z\d])/, message: "At least one special character." },
        { regex: /.{8,}/, message: "At least 8 characters long." },
    ];

    return checks
        .filter(({ regex }) => !regex.test(password))
        .map(({ message }) => message);
};

export { getPasswordWarnings }