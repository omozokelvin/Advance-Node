const cluster = require('cluster');

console.log(cluster.isMaster);

if (cluster.isMaster) {
  // Cause index.js to be executed *again* but in child mode
  cluster.fork();
  cluster.fork();
  cluster.fork();
  cluster.fork();
} else {
  // I'm a child, I'm going to act like a server and do nothing else

  const express = require('express');
  const app = express();

  // const doWork = (duration) => {
  //   const start = Date.now();
  //   while (Date.now() - start < duration) {}
  // };

  app.get('/', (req, res) => {
    // doWork(5000);


 
    res.send('Hello World!');
  });

  app.get('/fast', (req, res) => {
    res.send('This was fast!');
  });

  app.listen(3000, () => {
    console.log('App listening on port 3000!');
  });
}
