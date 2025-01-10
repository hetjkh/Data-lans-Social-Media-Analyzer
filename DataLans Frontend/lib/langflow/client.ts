import { LANGFLOW_CONFIG } from './config';

export async function queryLangflow(input: string) {
  try {
    const response = await fetch(`${LANGFLOW_CONFIG.BASE_API_URL}/api/v1/process/${LANGFLOW_CONFIG.FLOW_ID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${LANGFLOW_CONFIG.APPLICATION_TOKEN}`,
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        input: {
          query: input
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API request failed: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    return {
      response: data.result || "I couldn't process that request. Could you try rephrasing it?",
      analytics: data.analytics || [],
      error: null
    };
  } catch (error) {
    console.error('Langflow API error:', error);
    return {
      response: "Sorry, I encountered an error processing your request.",
      analytics: [],
      error: error.message
    };
  }
}