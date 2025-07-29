import { vectorDbConfig } from "../config/vectorDbConfig";

const vectorStore = vectorDbConfig;

export const retriever = vectorStore.asRetriever({
    // filter: filter,
    k: 5,
});