// utils/geminiClient.js

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

export const generateGeminiResponse = async (userInput) => {
  try {
    const res = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: userInput }],
          },
        ],
      }),
    });

    const data = await res.json();
    console.log('Raw Gemini Response:', JSON.stringify(data, null, 2));

    if (!data?.candidates?.length) {
      throw new Error('⚠️ No candidates returned from Gemini API.');
    }

    const botReply = data.candidates[0]?.content?.parts?.[0]?.text;

    if (!botReply) {
      throw new Error('⚠️ No response text returned from Gemini.');
    }

    return botReply;
  } catch (error) {
    console.error('Gemini Error:', error);
    throw error;
  }
};
