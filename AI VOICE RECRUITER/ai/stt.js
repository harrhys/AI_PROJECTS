import OpenAI from "openai";
import { handleText } from "../orchestrator/conversation.js";

const openai = new OpenAI();

export async function handleAudioChunk(base64Audio, socket) {
  const buffer = Buffer.from(base64Audio, "base64");

  const transcription = await openai.audio.transcriptions.create({
    file: buffer,
    model: "whisper-1"
  });

  if (transcription.text) {
    await handleText(transcription.text, socket);
  }
}
