const { Worker } = require('worker_threads')
const path = require('path');

module.exports = function(data) {
    return new Promise((resolve, reject) => {
        const worker = new Worker(path.join(__dirname, '../workers/mailWorker.js'));
        worker.postMessage(data);
        worker.on('online', () => { console.log('Mail worker connected') })
        worker.on('message', messageFromWorker => {
            console.log(messageFromWorker)
            return resolve
        })
        worker.on('error', reject)
        worker.on('exit', code => {
            if (code !== 0) {
                reject(new Error(`Worker stopped with exit code ${code}`))
            }
        })
    })
}
  