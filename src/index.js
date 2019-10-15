require('dotenv').config({ path: 'variables.env' });

const express = require('express');
const bodyParser = require('body-parser');

const verifyWebhook = require('./verify-webhook');
const messageWebhook = require('./message-webhook');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/home', (req, res) => { res.status(200).send('Hi, friend! Happy you are using my app') });

app.get('/webhook', verifyWebhook);
app.post('/webhook', messageWebhook);

app.listen(process.env.PORT, ()=> console.log(`Express server is listening on port ${process.env.PORT}`));
