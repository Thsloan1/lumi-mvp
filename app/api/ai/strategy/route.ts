import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { behavior, age, context } = await req.json();

  if (!behavior) {
    return NextResponse.json({ error: "Missing behavior" }, { status: 400 });
  }

  const prompt = `
You are Lumi, a behavior specialist for early childhood educators. A teacher has logged the following:

Behavior: ${behavior}
Age: ${age || "unspecified"}
Context: ${context || "unspecified"}

If details are vague or insufficient (e.g., "a lot"), respond with follow-up questions to clarify.
If the info is clear, suggest 2–3 research-informed strategies.

Output format:
- If incomplete → Follow-up questions.
- If complete → List of strategies.

Begin:
`;

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      }),
    });

    const data = await res.json();
    const aiReply = data.choices?.[0]?.message?.content;

    return NextResponse.json({ message: aiReply });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'AI request failed' }, { status: 500 });
  }
}
