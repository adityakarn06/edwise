import api from '../lib/api';

export const getAllDoc = async () => {
    try {
        const response = await api.get('/document');
        return response.data;
    } catch (error) {
        console.error("Error fetching documents:", error);
        throw new Error("Failed to fetch documents");
    }
}