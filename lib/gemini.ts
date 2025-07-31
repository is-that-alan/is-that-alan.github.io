
// WARNING: This is an insecure implementation for demonstration purposes only.
// The API key is exposed on the client side.
// Replace this with a secure backend proxy in production.

export async function callGeminiApi(prompt: string, apiKey: string, onChunk: (chunk: string) => void): Promise<void> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:streamGenerateContent?key=${apiKey}`;

  const requestBody = {
    contents: [{
      parts: [{
        text: `Generate a complete HTML page based on the following query. The HTML should be self-contained, with all CSS and JavaScript embedded within the HTML. Do not include any external links or scripts. Avoid placeholder images. Only return the HTML content, no other text or markdown. Query: ${prompt}`
      }]
    }]
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`API request failed with status ${response.status}: ${errorBody}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error("Failed to get reader from response body.");
    }

    const decoder = new TextDecoder();
    let done = false;
    let accumulatedContent = "";

    while (!done) {
      const { value, done: readerDone } = await reader.read();
      done = readerDone;
      const chunk = decoder.decode(value, { stream: true });

      try {
        const parsedChunk = JSON.parse(chunk);
        if (parsedChunk.candidates && parsedChunk.candidates.length > 0 && parsedChunk.candidates[0].content && parsedChunk.candidates[0].content.parts && parsedChunk.candidates[0].content.parts.length > 0) {
          const newContent = parsedChunk.candidates[0].content.parts[0].text;
          onChunk(newContent);
        }
      } catch (e) {
        // Handle cases where the chunk is not a complete JSON object yet
        // or if there are multiple JSON objects in a single chunk
        const jsonStrings = chunk.split(/}\s*{/);
        for (let i = 0; i < jsonStrings.length; i++) {
          let jsonString = jsonStrings[i];
          if (jsonStrings.length > 1 && i === 0) {
            jsonString += '}';
          } else if (jsonStrings.length > 1 && i === jsonStrings.length - 1) {
            jsonString = '{' + jsonString;
          }

          try {
            const parsedChunk = JSON.parse(jsonString);
            if (parsedChunk.candidates && parsedChunk.candidates.length > 0 && parsedChunk.candidates[0].content && parsedChunk.candidates[0].content.parts && parsedChunk[0].content.parts.length > 0) {
              const newContent = parsedChunk.candidates[0].content.parts[0].text;
              accumulatedContent += newContent;
              onChunk(accumulatedContent);
            }
          } catch (innerError) {
            // This chunk is likely incomplete or malformed, ignore for now
            console.warn("Incomplete or malformed JSON chunk:", jsonString, innerError);
          }
        }
      }
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    onChunk(`Error fetching response from Gemini: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
