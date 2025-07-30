
// WARNING: This is an insecure implementation for demonstration purposes only.
// The API key is exposed on the client side.
// Replace this with a secure backend proxy in production.

export async function callGeminiApi(prompt: string, apiKey: string): Promise<string> {
  // The API key is now passed in as an argument. 
  
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`;


  const requestBody = {
    contents: [{
      parts: [{
        text: prompt
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

    const data = await response.json();
    
    if (data.candidates && data.candidates.length > 0 && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts.length > 0) {
      return data.candidates[0].content.parts[0].text;
    } else {
      return "No content received from Gemini. The response may be blocked due to safety settings.";
    }

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return `Error fetching response from Gemini: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}
