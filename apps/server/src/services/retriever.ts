import { getPineconeClient } from "../lib/pinecone";
import { convertToAscii } from "../lib/utils";
const VectorIndexName = process.env.PINECONE_INDEX_NAME;

export async function retriever(embeddings: number[], fileName: string) {
    if (!VectorIndexName) {
        throw new Error('Pinecone index name is not set in environment variables');
    }
    const pc = await getPineconeClient();
    const index = pc.Index(VectorIndexName);

    try {
        const namespace = convertToAscii(fileName);
        const queryResult = await index.namespace(namespace).query({
            vector: embeddings,
            topK: 5,
            includeMetadata: true,
            includeValues: false,
        });
        return queryResult.matches || [];
    } catch (error) {
        console.error('Error retrieving documents:', error);
        throw new Error('Failed to retrieve documents');
    }
}