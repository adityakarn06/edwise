import { CharacterTextSplitter } from "@langchain/textsplitters";

export function createTextSplitter() {
  return new CharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
}