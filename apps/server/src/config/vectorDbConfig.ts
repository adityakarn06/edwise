import { QdrantVectorStore } from "@langchain/qdrant";
import { vectorCollectionName } from "./config";
import { createEmbeddings } from "../lib/embeddings";

const embeddings = createEmbeddings();

export const vectorDbConfig = new QdrantVectorStore(embeddings, {
    url: 'http://localhost:6333', // Docker exposed port
    collectionName: vectorCollectionName
});