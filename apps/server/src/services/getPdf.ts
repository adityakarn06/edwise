import fs from 'fs';
import axios from 'axios';

interface DownloadPdfParams {
    fileUrl: string;
    outputPath: string;
}

export async function downloadPdfFromCloudinary({ fileUrl, outputPath }: DownloadPdfParams): Promise<string> {
    try {
        const response = await axios.get(fileUrl, {
            responseType: 'stream'
        });

        response.data.pipe(fs.createWriteStream(outputPath));

        return new Promise((resolve, reject) => {
            response.data.on('end', () => resolve('PDF downloaded successfully!'));
            response.data.on('error', (err: Error) => reject(err));
        });
    } catch (error) {
        console.error('Error downloading PDF:', error);
        throw error;
    }
}