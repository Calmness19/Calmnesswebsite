const http = require('http');
const { URL } = require('url');

const port = 3000;
const tasks = new Map();

function sendJson(res, status, obj) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(obj));
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === '/api/tasks' && req.method === 'GET') {
    return sendJson(res, 200, Array.from(tasks.values()));
  }

  if (url.pathname === '/api/tasks' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const data = JSON.parse(body || '{}');
        const id = data.id;
        if (!id) {
          return sendJson(res, 400, { error: 'id required' });
        }
        if (tasks.has(id)) {
          return sendJson(res, 200, tasks.get(id));
        }
        tasks.set(id, data);
        return sendJson(res, 201, data);
      } catch (err) {
        return sendJson(res, 400, { error: 'invalid json' });
      }
    });
    return;
  }

  sendJson(res, 404, { error: 'Not found' });
});

if (require.main === module) {
  server.listen(port, () => console.log(`Server listening on ${port}`));
}

module.exports = server;
