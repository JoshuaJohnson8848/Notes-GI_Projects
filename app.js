const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const app = express();

dotenv.config({ path: './config/.env' });

app.use(express.json());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS,GET,POST,PUT,PATCH,DELETE'
  );
  res.setHeader('Access-Control-Allow-Header', 'Content-Type', 'Authorization');
  next();
});

const noteRoute = require('./routes/note');

app.use('/api/v1/notes', noteRoute);

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const data = error.data;
  const message = error.message;
  res.status(status).json({ message: message, data: data });
  next();
});

mongoose
  .connect(process.env.MONGO_URI)
  .then((result) => {
    app.listen(process.env.PORT, (req, res, next) => {
      console.log(`Server is Running at ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
