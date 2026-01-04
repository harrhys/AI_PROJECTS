import OpenAI from "openai";
const openai = new OpenAI();

export async function speak(text, socket) {
  const speech = await openai.audio.speech.create({
    model: "gpt-4o-mini-tts",
    voice: "alloy",
    input: text
  });

  const audioBase64 = Buffer.from(await speech.arrayBuffer()).toString("base64");

  socket.send(JSON.stringify({
    event: "media",
    media: { payload: audioBase64 }
  }));
}
