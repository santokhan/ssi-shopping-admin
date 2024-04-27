

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
        size: '',
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
    size: '', // number
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

const FILLED = {
    "title": "Title",
    "description": "Description",
    "category": "4",
    "listed_in": "1",
    "agent": "12",
    "status": "true",
    "price": 50000,
    "featured": "true",
    // "images": {
    //     "0": {},
    //     "1": {}
    // },
    "video_from": "youtube",
    "embed_video_id": "44s4df56ds46f5",
    "virtual_tour": "https://api.demo.bsmproperty.ae/swagger/",
    "address": "Dubai, UAE",
    "country": "1",
    "city": "21",
    "area": "11",
    "latitude": "1111111111111",
    "longitude": "2",
    "size": 2000,
    "built_up_size": 2000,
    "bedrooms": 3,
    "bathrooms": 3,
    "parking": 3,
    "garage_size": 4,
    "year_built": 2000,
    "basement": "true",
    "extra_detail": "Note From Agent",
    // "amenities": JSON.stringify([{
    //     "id": 55,
    //     "title": "garage",
    //     "icon": "https://api.demo.bsmproperty.ae/media/master-data/amenities/icon/spartan-logo-template-modern-logo-esport-team-vector-26010434.jpg",
    // }])
}

export { INITIAL, INITIAL_VALUES, FILLED };