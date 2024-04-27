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
            'agent_note',

            // amenities
            'amenities',
        ]

        let filtered = {}

        for (const key in properties) {
            if (Object.hasOwnProperty.call(properties, key)) {
                if (keysINeed.includes(key)) {
                    const element = properties[key];
                    filtered[key] = element
                }
            }
        }

        return filtered;
    } else {
        throw new Error('property must be an object');
    }
};

export default validateProperties