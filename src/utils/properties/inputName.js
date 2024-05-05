const INPUT_NAME = {
    title: 'title',
    description: 'description',
    category: 'category',
    listed_in: 'listed_in',
    agent: 'agent',
    status: 'status',
    price: 'price',
    featured: 'featured',


    images: 'images',
    video_from: 'video_from',
    embed_video_id: 'embed_video_id',
    virtual_tour: 'virtual_tour',


    address: 'address',
    country: 'country',
    city: 'city',
    area: 'area',
    latitude: 'latitude',
    longitude: 'longitude',


    size: 'size',
    built_up_size: 'built_up_size',
    bedrooms: 'bedrooms',
    bathrooms: 'bathrooms',
    parking: 'parking',
    garage_size: 'garage_size',
    year_built: 'year_built',
    basement: 'basement',
    extra_detail: 'extra_detail',


    amenities: 'amenities',
}

function setValuesToEmptyString(obj) {
    const o = {}
    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            o[key] = '';
        }
    }
    return o;
}

export {
    INPUT_NAME
}