export default async function voiceWebhook(req, reply) {
  const twiml = `
    <Response>
      <Say voice="alice">
        Hello, this is the automated recruiter. This call will be recorded.
      </Say>
      <Connect>
        <Stream url="wss://${req.headers.host}/stream" />
      </Connect>
    </Response>
  `;
  reply.type("text/xml").send(twiml);
}
