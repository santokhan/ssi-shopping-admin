import { Initial_Roadmap } from "../../utils/initialRoadmap";

const dataBridgeForProperties = (properties = {}) => {
    const p = properties
    if (typeof properties === 'object') {
        // custom structure don't make function for that
        const converted = {
            title: p.title,
            description: p.description,
            category: p.category.id,
            listed_in: p.listed_in,
            agent: p.agent.id,
            status: p.status,
            price: p.price,
            featured: p.featured,
            images: p.images,
            video_from: p.video_from,
            embed_video_id: p.embed_video_id,
            virtual_tour: p.virtual_tour,
            address: p.address,
            interior_image: p.interior_image || [],
            interior_description: p.interior_description,
            exterior_image: p.exterior_image || [],
            exterior_description: p.exterior_description,
            country: p.country.id,
            city: p.city.id,
            area: p.area.id,
            latitude: p.latitude,
            longitude: p.longitude,
            roadmap: Array.isArray(p.roadmap) || [Initial_Roadmap],
            size: p.size,
            built_up_size: p.built_up_size,
            bedrooms: p.bedrooms,
            bathrooms: p.bathrooms,
            parking: p.parking,
            garage_size: p.garage_size,
            year_built: p.year_built,
            basement: p.basement,
            extra_detail: p.extra_detail,
            amenities: p.amenities.map(e => {
                if (typeof e === 'object' && e.id) {
                    return e.id
                }
                if (typeof e === 'number') {
                    return e
                }
            }).filter(e => e),
        }
        return converted
    } else {
        throw new Error('property must be an object');
    }
};

// Example
// Debug using ChatGPT

export default dataBridgeForProperties

