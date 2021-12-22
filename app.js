require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express')
const Mailer = require('./mailer');
const path = require("path");
const app = express()
const PORT = process.env.PORT || 80
const API_KEY = process.env.API_KEY || 'zorblug'

app.set('trust proxy', true)

app.use(bodyParser.json());                         // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies
app.use(express.json());                            // to support JSON-encoded bodies
app.use(express.urlencoded());                      // to support URL-encoded bodies

app.post('/', (req, res)=>{
    console.log('Requete recuperee');
    if(req.body.apiKey == API_KEY) {
        console.log('Cle api correct');
        if(req.body.noStatus) { // noStatus c'eest pour heuuuu
            console.log('Pas de status. Fin operation.');
            res.status(200).send({
                status: 'done',
                text: 'no status'
            });
        }

        let mailer = new Mailer(
            req.body.params, 
            req.body.mail
        );

        mailer.send().then(r=>{
            if(!req.body.noStatus) {
                console.log('Mail envoye. Fin operation.');
                res.status(200).send({
                    status: 'done',
                    text: 'oki doki'
                })
                return;
            }
        })
        .catch(e=>{
            if(!req.body.noStatus) {
                console.error(e);
                console.log('Mail non envoye. Fin operation.');
                res.status(400).send({
                    status: 'error',
                    error: e
                })
                return;
            }
        })

        
    } else {
        console.log('Cle api incorrecte. Fin operation.');
        res.status(400).send({
            text: 'Clé api incorrecte'
        })
    }
})

app.listen(PORT, () => {
    console.log(`app listening at http://localhost:${PORT}`)
})