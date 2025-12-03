const { WebSocketServer, WebSocket } = require('ws');

function peerProxy(httpServer) {
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });

  wss.on('connection', (ws) => {
    ws.isAlive = true;

    ws.on('message', (data) => {
      for (const client of wss.clients) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      }
    });

    ws.on('pong', () => { ws.isAlive = true; });
  });

  setInterval(() => {
    for (const client of wss.clients) {
      if (client.isAlive === false) { client.terminate(); continue; }
      client.isAlive = false;
      client.ping();
    }
  }, 10000);
}

module.exports = { peerProxy };
