const express = require('express');
const path = require('path');
const cors = require('cors');
const apiRouter = require('./routes');

let app = express()

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../client')))

app.use('/api', apiRouter);

app.listen(3000)