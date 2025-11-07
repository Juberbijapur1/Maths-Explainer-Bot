import { GoogleGenAI } from "@google/genai";
import type { Message } from '../types';

const buildHistory = (messages: Message[]) => {
  return messages.map(msg => ({
    role: msg.role === 'model' ? 'model' : 'user',
    parts: [{ text: msg.content }]
  }));
};

export async function* streamBotResponse(messages: Message[]): AsyncGenerator<string> {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
  }
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = 'gemini-2.5-pro';

  // The last message is the new user prompt.
  const lastMessage = messages[messages.length - 1];
  // The history is all messages before the last one.
  const history = buildHistory(messages.slice(0, -1));

  const chat = ai.chats.create({
    model: model,
    config: {
      systemInstruction: `You are an expert and friendly math tutor named 'Gem'. Your goal is to explain mathematical concepts clearly and simply.
- Break down complex topics into easy-to-understand, step-by-step explanations.
- Use analogies and real-world examples whenever possible to make concepts relatable.
- Format your answers using markdown for readability.
- Use LaTeX syntax enclosed in single dollar signs for inline math (e.g., $ax^2 + bx + c = 0$) and double dollar signs for block-level math (e.g., $$x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$$).
- Keep your tone encouraging and patient.
- Do not use features that are not supported by standard markdown.`,
    },
    history: history,
  });

  const resultStream = await chat.sendMessageStream({ message: lastMessage.content });

  for await (const chunk of resultStream) {
    yield chunk.text;
  }
}