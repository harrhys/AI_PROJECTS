import Fastify from "fastify";
import websocketPlugin from "@fastify/websocket";
import voiceWebhook from "./twilio/voiceWebhook.js";
import audioStream from "./websocket/audioStream.js";

const app = Fastify();
app.register(websocketPlugin);

app.post("/twilio/voice", voiceWebhook);
app.register(audioStream, { prefix: "/stream" });

app.listen({ port: 3000 }, () => {
  console.log("Voice Recruiter running on port 3000");
});
