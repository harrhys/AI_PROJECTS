import OpenAI from "openai";
const openai = new OpenAI();

export async function askLLM(session) {
  const messages = [
    {
      role: "system",
      content: `
You are an AI voice recruiter.
Ask concise screening questions.
Follow up if unclear.
Never mention scores.
`
    },
    ...session.history
  ];

  const result = await openai.chat.completions.create({
    model: "gpt-4.1",
    messages,
    temperature: 0.3
  });

  return result.choices[0].message.content;
}
