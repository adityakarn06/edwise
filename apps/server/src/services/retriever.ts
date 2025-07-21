import { SelfQueryRetriever } from "langchain/retrievers/self_query";
import { QdrantTranslator } from "@langchain/community/structured_query/qdrant";
import { llm } from './llm';
import { vectorDbConfig } from "../config/vectorDbConfig";

const attributeInfo = [
    {
        name: "source",
        description: "The filename or source of the document",
        type: "string",
    },
    {
        name: "page",
        description: "The page number in the document",
        type: "number",
    }
];

const vectorStore = vectorDbConfig;

export const selfQueryRetriever = SelfQueryRetriever.fromLLM({
    llm,
    vectorStore,
    attributeInfo,
    structuredQueryTranslator: new QdrantTranslator(),
    documentContents: "These documents contain educational content from various sources.",
});