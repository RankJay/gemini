import { systemPrompt } from '@/lib/utils';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleGenerativeAIStream, StreamingTextResponse } from 'ai';
import { Message } from 'ai/react';
 
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
 
// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';
 
export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const payload: { "messages": Message[]} = await req.json();

  const prompt = systemPrompt + " " + payload.messages[payload.messages.length - 1].content;
 
  // Ask Google Generative AI for a streaming completion given the prompt
  const response = await genAI
    .getGenerativeModel({ model: 'gemini-pro' })
    .generateContentStream({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    });
 
  // Convert the response into a friendly text-stream
  const stream = GoogleGenerativeAIStream(response);
 
  // Respond with the stream
  return new StreamingTextResponse(stream);
}