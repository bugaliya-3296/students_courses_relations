const { Console } = require('console');
const express = require('express');
const { get } = require('http');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const compression = require('compression');

const routes = require('./routes');

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use(compression());
app.use('/', routes);


app.listen(3000,()=> console.log("listening port number 3000..."));
