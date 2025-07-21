import { QdrantVectorStore } from "@langchain/qdrant";
import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/huggingface_transformers";
import { vectorCollectionName } from "../config/config";

export function createVectorStore(embeddings: HuggingFaceTransformersEmbeddings, collectionName = vectorCollectionName) {
  return new QdrantVectorStore(embeddings, {
    url: 'http://localhost:6333',
    collectionName,
    collectionConfig: {
      vectors: {
        size: 384,
        distance: "Cosine"
      }
    }
  });
}