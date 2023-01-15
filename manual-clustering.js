// every child will only have one thread
// process.env.UV_THREADPOOL_SIZE = 1;

const cluster = require('cluster');

if (cluster.isMaster) {
  // Cause index.js to be executed *again* but in child mode

  // each child will usually have 4 threads excep t we set it explicitly
  // cluster.fork();
  // cluster.fork();
  // cluster.fork();
  // cluster.fork();
  cluster.fork();
  cluster.fork();
} else {
  // I'm a child, I'm going to act like a server and do nothing else

  const express = require('express');
  const app = express();
  const crypto = require('crypto');

  // const doWork = (duration) => {
  //   const start = Date.now();
  //   while (Date.now() - start < duration) {}
  // };

  app.get('/', (req, res) => {
    // doWork(5000);
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
      res.send('Hello World!');
    });
  });

  app.get('/fast', (req, res) => {
    res.send('This was fast!');
  });

  app.listen(3000, () => {
    console.log('App listening on port 3000!');
  });
}
