const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();

dotenv.config({ path: './config/.env' });

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
