import { askLLM } from "../ai/brain.js";
import { speak } from "../ai/tts.js";
import { getSession, updateSession } from "../store/sessionStore.js";

export async function handleText(text, socket) {
  const session = getSession(socket);

  session.history.push({ role: "user", content: text });

  const response = await askLLM(session);

  session.history.push({ role: "assistant", content: response });
  updateSession(socket, session);

  await speak(response, socket);
}
