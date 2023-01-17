const { workerData, parentPort } = require('worker_threads');

console.log('worker data in worker -> ', workerData);

let counter = 0;
while (counter < workerData) {
  counter++;
}

parentPort.postMessage(counter);
