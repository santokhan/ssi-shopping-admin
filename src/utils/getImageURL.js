const URLBuilder = (image = '') => {
  const API = '';
  if (!API) return image;
  return API + image;
};

const getImageURL = (image) => {
  if (image && typeof image === 'string') {
    // "image": "/media/property/gallery/download.jpg"
    if (image.startsWith('/media/')) {
      return URLBuilder(image);
    } else {
      console.error(`Something went wrong`);
    }
  } else {
    return '';
  }
};

export default getImageURL;
