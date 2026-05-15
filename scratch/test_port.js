import http from 'http';
const server = http.createServer((req, res) => {
  res.end('Hello');
});
server.listen(4000, '127.0.0.1', () => {
  console.log('Listening on 4000');
  process.exit(0);
});
