import http from 'http';
const server = http.createServer((req, res) => {
  res.end('Hello');
});
server.listen(0, () => {
  console.log('Listening on ' + server.address().port);
  process.exit(0);
});
