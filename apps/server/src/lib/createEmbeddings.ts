import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/huggingface_transformers";

export async function createEmbedding(text: string): Promise<number[]> {
  const embeddings = new HuggingFaceTransformersEmbeddings({
    model: "Xenova/all-MiniLM-L6-v2",
  });
  
  const result = await embeddings.embedQuery(text);
  return result;
}