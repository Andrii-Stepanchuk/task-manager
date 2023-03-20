const express = require('express');
const routes = require('./routes/tasks');
const dbConfig = require('./db/config');
const mongoose = require("mongoose");
require('dotenv').config();

const app = express();
const port = process.env.PORT;
const connectionURL = process.env.MONGO_URL;

app.use(express.static('./public'));
app.use(express.json());

app.use('/api/v1/tasks', routes);

app.use((error, req, res, next) =>
    res.status(error.statusCode || 500).json({message: error.message, data: data})
);
app.use((req, res) => res.status(404).json('Page not found'));

mongoose
    .connect(connectionURL, dbConfig)
    .then(() => app.listen(port, () => console.log('server started on port ' + port)))
    .catch(err => console.log(err));


