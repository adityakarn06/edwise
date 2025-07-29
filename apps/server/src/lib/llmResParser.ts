export default function parseLlmJsonResponse(response: string): { answer: string; sources: string[] } {
    // Regex to find JSON content inside ```json ... ``` or ``` ... ```
    const jsonRegex = /```(json)?\s*([\s\S]*?)\s*```/;
    const match = response.match(jsonRegex);
  
    let jsonString;
  
    if (match && match[2]) {
      // If a match is found, use the captured group which is the JSON string
      jsonString = match[2];
    } else {
      // If no markdown fence is found, assume the whole string is the JSON
      jsonString = response;
    }
  
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      console.error("Failed to parse JSON:", error);
      throw new Error("Invalid JSON response from LLM after cleaning.");
    }
  }