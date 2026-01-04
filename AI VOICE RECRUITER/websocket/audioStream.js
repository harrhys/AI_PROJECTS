import { handleAudioChunk } from "../ai/stt.js";

export default async function (fastify) {
  fastify.get("/", { websocket: true }, (socket) => {
    socket.on("message", async (msg) => {
      const data = JSON.parse(msg);
      if (data.event === "media") {
        await handleAudioChunk(data.media.payload, socket);
      }
    });
  });
}
