const sessions = new Map();

export function getSession(socket) {
  if (!sessions.has(socket)) {
    sessions.set(socket, {
      history: [],
      state: "SCREENING"
    });
  }
  return sessions.get(socket);
}

export function updateSession(socket, session) {
  sessions.set(socket, session);
}
