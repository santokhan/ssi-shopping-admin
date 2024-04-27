function filterObjectByKeys(properties = null, keysINeed = []) {
    if (properties && typeof properties === 'object') {
        if (Array.isArray(keysINeed)) {
            let filtered = {}

            for (const key in properties) {
                if (Object.hasOwnProperty.call(properties, key)) {
                    if (keysINeed.includes(key)) {
                        const element = properties[key];
                        filtered[key] = element || ''
                    }
                }
            }

            return filtered;
        } else {
            throw new Error('keysINeed must be an array');
        }
    } else {
        throw new Error('property must be an object');
    }
}


const validateProperties = (properties = {}) => {
    if (typeof properties === 'object') {
        const keysINeed = [
            'id',

            // description
            'title',
            'description',
            'category',
            'listed_in',
            'agent',
            'status',
            'price',
            'featured',

            // media
            'video_from',
            'embed_video_id',
            'virtual_tour',

            // location
            'address',
            'country',
            'city',
            'area',
            'latitude',
            'longitude',

            // details
            'size',
            'bedrooms',
            'bathrooms',
            'parking',
            'garage_size',
            'year_built',
            'basement',
            'extra_detail',

            // amenities
            'amenities',
        ]

        const filtered = filterObjectByKeys(properties, keysINeed)

        return filtered
    } else {
        throw new Error('property must be an object');
    }
};

// // example usage
// const properties = {
//     id: 1,
//     abc: '',
//     title: 'test',
//     description: 'test',
//     category: [],
//     listed_in: 'test',
//     agent: 'test',
//     status: 'test',
//     price: 1,
//     featured: true,
//     video_from: 'test',
//     embed_video_id: 'test',
//     virtual_tour: 'test',
//     address: 'test',
//     country: 'test',
//     city: 'test',
//     area: 'test',
//     latitude: 1,
//     longitude: 1,
//     size: 1,
//     bedrooms: 1,
//     bathrooms: 1,
//     parking: 1,
//     garage_size: 1,
//     year_built: 1,
//     basement: 'test',
//     agent_note: 'test',
//     amenities: [],
// }
// console.log(validateProperties(properties))

export default validateProperties