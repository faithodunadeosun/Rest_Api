require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const clientsRouter = require('./routes/clients');
const app = express();
app.use(express.json());
app.use('/clients', clientsRouter)
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection
db.on('error', err => console.error(err))
db.once('open', () => console.log('connected to database'))

app.listen(5080, () => console.log('server is running on port 5080'));