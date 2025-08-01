import axios from "axios";
import pdf from "pdf-parse";

export const extractTextFromPDF = async (url: string) => {
    const { data } = await axios.get(url, { responseType: 'arraybuffer' });
    const text = await pdf(data);
    return text.text;
};