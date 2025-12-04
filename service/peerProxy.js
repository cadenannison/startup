const { WebSocketServer } = require('ws');
const WebSocket = require('ws');

function peerProxy(httpServer) {
  const wss = new WebSocketServer({ server: httpServer });

  wss.on('connection', (ws) => {
    ws.isAlive = true;

    ws.on('message', (data) => {
      for (const client of wss.clients) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      }
    });

    ws.on('pong', () => {
      ws.isAlive = true;
    });
  });

  const interval = setInterval(() => {
    for (const client of wss.clients) {
      if (client.isAlive === false) {
        client.terminate();
        continue;
      }
      client.isAlive = false;
      try { client.ping(); } catch {}
    }
  }, 10000);

  const broadcast = (data) => {
    const payload = typeof data === 'string' ? data : JSON.stringify(data);
    for (const client of wss.clients) {
      if (client.readyState === WebSocket.OPEN) client.send(payload);
    }
  };

  return {
    broadcast,
    close: () => { clearInterval(interval); wss.close(); },
  };
}

module.exports = { peerProxy };
