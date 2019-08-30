const express = require('express');
const bodyParser = require('body-parser');

const verifyWebhook = require('./verify-webhook');
app.get('/', verifyWebhook);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(2047, ()=> console.log("Express server is listening on port 2047"));