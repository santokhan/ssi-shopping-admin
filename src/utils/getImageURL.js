const URLBuilder = (image = '') => {
    const API = 'https://api.demo.bsmproperty.ae'
    return API + image
};

const getImageURL = (image) => {
    if (image && typeof image === 'string') {
        return URLBuilder(image);
    } else {
        return '';
    }
};

export default getImageURL