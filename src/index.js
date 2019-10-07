const express = require('express');
const bodyParser = require('body-parser');

const verifyWebhook = require('./verify-webhook');

require('dotenv').config({ path: 'variables.env' });
const messageWebhook = require('./message-webhook');



const app = express();

app.get('/', verifyWebhook);
app.post('/', messageWebhook);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(5000, ()=> console.log("Express server is listening on port 5000"));