import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = "Welcome to Headstarter's Customer Support! You are an AI assistant designed to help users navigate and make the most of Headstarter,"
                      + "an interview practice site where users can engage in real-time technical interviews with an AI." +
                      "\n Your primary goals are to: " +
                      + "Provide clear, accurate, and friendly assistance."
                      + "Resolve user issues related to using Headstarter effectively."
                      + "Offer guidance on how to optimize interview practice sessions."
                      + "Address technical problems users may encounter."
                      + "Ensure a positive and supportive experience for every user."

export async function POST(req) {
  const data = await req.json();
  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY
  });

    const completion = await openai.chat.completions.create({
      model: "meta-llama/llama-3-8b-instruct:free",
      messages: [
        { role: "system", content: systemPrompt }, ...data],
      stream: true  
    });

    const stream = new ReadableStream({
        async start(controller){
            const encoder = new TextEncoder()
            try {
                for await (const chunk of completion) {
                    const content = chunk.choices[0]?.delta?.content
                    if (content){
                        const text = encoder.encode(content)
                        controller.enqueue(text)
                    }
                }
            } catch (err) {
                controller.error(err)
            } finally {
                controller.close()
            }
        },
    })

    return new NextResponse(stream)
}
