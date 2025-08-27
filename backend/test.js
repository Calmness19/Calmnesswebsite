const server = require('./index');
const assert = require('assert');

async function run() {
  await new Promise(resolve => server.listen(0, resolve));
  const port = server.address().port;
  const base = `http://localhost:${port}`;

  const createRes = await fetch(`${base}/api/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: '1', title: 'Test Task' })
  });
  assert.strictEqual(createRes.status, 201);

  const listRes = await fetch(`${base}/api/tasks`);
  const tasks = await listRes.json();
  assert.strictEqual(listRes.status, 200);
  assert.strictEqual(tasks.length, 1);
  assert.strictEqual(tasks[0].title, 'Test Task');

  server.close();
  console.log('All tests passed');
}

run().catch(err => {
  console.error(err);
  server.close();
  process.exit(1);
});
