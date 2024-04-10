import api from "../api";

export async function getAgent() {
    try {
        const res = await api.get('agents/');

        return res;
    } catch (error) {
        console.log(error);
    }
}

export async function getCategories() {
    try {
        const res = await api.get('categories/');

        return res;
    } catch (error) {
        console.log(error);
    }
}

export async function getAmenities() {
    try {
        const res = await api.get('amenities/');

        return res;
    } catch (error) {
        console.log(error);
    }
}