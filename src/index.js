const { Console } = require('console');
const express = require('express');
const { get } = require('http');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const compression = require('compression');


// app.get('/', (req, res)=>{
//     res.send("hello;;...!");
// })

// (async () => {
// try {
//     await mongoose.connect('mongodb+srv://nimba:JT9z0KHMUyyMm6pH@cluster0.kryju.mongodb.net/test?authSource=admin&replicaSet=atlas-139jy3-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true', { useCreateIndex: true, useNewUrlParser: true });
//   } catch (err) {
//     console.log('mongodb connection error' + err);
//   }
// })()

const AuthRoutes = require('./routes/auth.route');
const routes = require('./routes');

// app.use('/auth', AuthRoutes);
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use(compression());
app.use('/', routes);


app.listen(3000,()=> console.log("listening port number 3000..."));
