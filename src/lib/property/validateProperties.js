import { INPUT_NAME as inn } from "../../utils/properties/inputName";

const validateProperties = (properties = {}) => {
    if (typeof properties === 'object') {
        // custom structure don't make function for that
        const converted = {
            [inn.title]: properties[inn.title],
            [inn.description]: properties[inn.description],
            [inn.category]: properties[inn.category].id,
            [inn.listed_in]: properties[inn.listed_in],
            [inn.agent]: properties[inn.agent].id,
            [inn.status]: properties[inn.status],
            [inn.price]: properties[inn.price],
            [inn.featured]: properties[inn.featured],
            [inn.video_from]: properties[inn.video_from],
            [inn.embed_video_id]: properties[inn.embed_video_id],
            [inn.virtual_tour]: properties[inn.virtual_tour],
            [inn.address]: properties[inn.address],
            [inn.country]: properties[inn.country],
            [inn.city]: properties[inn.city],
            [inn.area]: properties[inn.area],
            [inn.latitude]: properties[inn.latitude],
            [inn.longitude]: properties[inn.longitude],
            [inn.size]: properties[inn.size],
            [inn.bedrooms]: properties[inn.bedrooms],
            [inn.bathrooms]: properties[inn.bathrooms],
            [inn.parking]: properties[inn.parking],
            [inn.garage_size]: properties[inn.garage_size],
            [inn.year_built]: properties[inn.year_built],
            [inn.basement]: properties[inn.basement],
            [inn.extra_detail]: properties[inn.extra_detail],
            [inn.amenities]: properties[inn.amenities],
        }
        return converted
    } else {
        throw new Error('property must be an object');
    }
};

// Example
// Debug using ChatGPT

export default validateProperties

