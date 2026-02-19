
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || "";

export const getFinancialAdvice = async (userPrompt: string, financialContext: string) => {
  if (!apiKey) {
    throw new Error("API Key ausente. Certifique-se de que ela está configurada no ambiente.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        {
          text: `Você é um consultor financeiro prestativo e profissional.
          Use o seguinte contexto para responder às perguntas: ${financialContext}
          
          O usuário perguntou: ${userPrompt}
          
          Forneça uma resposta clara, concisa e encorajadora. 
          Use markdown para formatação. Mantenha um tom amigável e de apoio. Responda em Português do Brasil.`
        }
      ],
      config: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 500,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Erro na API Gemini:", error);
    throw error;
  }
};
