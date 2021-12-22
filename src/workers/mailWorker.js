const Mailer = require('../class/Mailer');
const { parentPort } = require('worker_threads')

console.log('mail worker launched, waiting for a message');

parentPort.on('message', (reqBody) => {
    let mailer = new Mailer(
        reqBody.params, 
        reqBody.mail
    );
    
    mailer.send().then(r=>{
        console.log('Mail envoye. Fin operation.');
        parentPort.postMessage({
            status: 200,
            content: {
                status: 'done',
                text: 'oki doki'
            }
        })
    })
    .catch(e=>{
        console.error(e);
        console.log('Mail non envoye. Fin operation.');
        parentPort.postMessage({
            status: 400,
            content: {
                status: 'error',
                error: e
            }
        })
    })
});
