require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express')
const Mailer = require('./mailer');
const path = require("path");
const app = express()
const PORT = process.env.PORT || 3000
const API_KEY = process.env.API_KEY || 'zorblug'

app.set('trust proxy', true)

app.use(bodyParser.json());                         // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies
app.use(express.json());                            // to support JSON-encoded bodies
app.use(express.urlencoded());                      // to support URL-encoded bodies

//add the router folders
app.use(express.static('public'));             // Store all assets, js and css files in public folder.



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
})

app.post('/', (req, res)=>{
    if(req.body.apiKey == API_KEY) {
        let mailer = new Mailer(
            req.body.params, 
            req.body.mail
        );

        mailer.send().then(r=>{
            res.status(200).send({
                status: 'ok',
                text: 'oki doki'
            })
        })
        .catch(e=>{
            res.status(400).send({
                status: 'error',
                error: e
            })
        })

        
    } else {
        res.status(400).send({
            text: 'Clé api incorrecte'
        })
    }
})

app.listen(PORT, () => {
    console.log(`app listening at http://localhost:${PORT}`)
})