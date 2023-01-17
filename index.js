const express = require('express');
const app = express();
const { Worker } = require('worker_threads');

async function runService(workerData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./worker.js', { workerData });

    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    });

    // let counter = 0;
    // while (counter < workerData) {
    //   counter++;
    // }
    // resolve(counter)
  });
}

app.get('/', (req, res) => {
  const worker1 = runService(1000000000);
  const worker2 = runService(1000000000);
  const worker3 = runService(1000000000);
  const worker4 = runService(1000000000);
  const worker5 = runService(1000000000);
  const worker6 = runService(1000000000);
  const worker7 = runService(1000000000);
  const worker8 = runService(1000000000);
  const worker9 = runService(1000000000);
  const worker10 = runService(1000000000);

  Promise.all([
    worker1,
    worker2,
    worker3,
    worker4,
    worker5,
    worker6,
    worker7,
    worker8,
    worker9,
    worker10,
  ]).then((results) => {
    console.log('results -> ', results);
    res.send(`Hello World! ${results}`);
  });
});

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
