import { NextResponse } from "next/server";
import OpenAI from "openai";
import { z } from "zod";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const inputSchema = z.object({
  behavior: z.string().min(1),
  age: z.string().optional(),
  context: z.string().optional(),
});

const vaguePatterns = [
  "a lot", "acting out", "bad", "stuff", "crazy", "everything", "something", "wild"
];

function isVague(input: string) {
  const lower = input.toLowerCase();
  return vaguePatterns.some(p => lower.includes(p)) || input.trim().length < 15;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { behavior, age, context } = inputSchema.parse(body);

    if (isVague(behavior)) {
      return NextResponse.json({
        followUp: true,
        message: "Can you describe the specific behavior in more detail?"
      });
    }

    const messages = [
      {
        role: "system",
        content: "You are an expert in early childhood education. Generate 3 clear, practical behavior strategies based on behavior description, age, and classroom context.",
      },
      {
        role: "user",
        content: `Behavior: ${behavior}\nAge: ${age || "unknown"}\nContext: ${context || "unknown"}`,
      },
    ];

    const chat = await openai.chat.completions.create({
      model: "gpt-4",
      messages,
      temperature: 0.7,
    });

    const response = chat.choices[0].message.content;

    return NextResponse.json({ followUp: false, strategies: response });
  } catch (error) {
    console.error("Error in strategy generation:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
