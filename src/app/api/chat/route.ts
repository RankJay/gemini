import { systemPrompt } from '@/lib/utils';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleGenerativeAIStream, StreamingTextResponse } from 'ai';
import { Message } from 'ai/react';
import { cookies } from 'next/headers';
import { kv } from '@vercel/kv';
 
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
 
// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';
 
export async function POST(req: Request) {
  const store = cookies();
  // Extract the `prompt` from the body of the request
  const payload: { "messages": Message[]} = await req.json();
  const emailsDataString = await kv.get("emailData"); // store.get("emaildata")?.value || '';

  const prompt = systemPrompt + " " + emailsDataString + "\n\n Following is the user prompt:\n" + payload.messages[payload.messages.length - 1].content;
 
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