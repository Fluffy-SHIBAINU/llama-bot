import { Handler } from '@netlify/functions';
import fetch from 'node-fetch';

const handler: Handler = async (event) => {
  try {
    const parsed = JSON.parse(event.body || '{}');
    const message = parsed.message || '';

    if (!message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'No message provided' })
      };
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Missing API Key' })
      };
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }]
      })
    });

    const data = await response.json();

    console.log(JSON.stringify(data, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: data.choices?.[0]?.message?.content ?? 'No response from AI' })
    };
  } catch (err: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message || 'Unknown error' })
    };
  }
};

export { handler };
