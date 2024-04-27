const INITIAL = {
    // description
    description: {
        title: '',
        description: '',
        category: '',
        listed_in: '',
        agent: '',
        status: false,
        price: 0,
        featured: false,
    },
    // media
    media: {
        images: [],
        video_from: '',
        embed_video_id: '',
        virtual_tour: '',
    },
    // location
    location: {
        address: '',
        country: '',
        city: '',
        area: '',
        latitude: '',
        longitude: '',
    },
    // details
    details: {
        total_area: '',
        built_up_size: '',
        bedrooms: '',
        bathrooms: '',
        parking: '',
        garage_size: '',
        year_built: '',
        basement: false,
        extra_detail: '',
    },
    // amenities
    amenities: [],
};

const INITIAL_VALUES = {
    // description
    title: '', // string
    description: '', // string
    category: '', // string (villa, house, flat, etc.)
    listed_in: '', // string (for sale, for rent, etc.)
    agent: '', // id of agent
    status: '', // true or false
    price: 0, // number
    featured: '', // true or false

    // media
    images: [], // array
    video_from: '', // youtube or vimeo
    embed_video_id: '', // URL
    virtual_tour: '', // URL

    // location
    address: '', // string
    country: '', // id
    city: '', // id
    area: '', // id
    latitude: '', // number
    longitude: '', // number

    // details
    total_area: '', // number
    built_up_size: '', // number
    bedrooms: '', // number
    bathrooms: '', // number
    parking: '', // number
    garage_size: '', // number
    year_built: '', // number
    basement: '', // true or false
    extra_detail: '', // string

    // amenities
    amenities: [], // array
};

export { INITIAL, INITIAL_VALUES };