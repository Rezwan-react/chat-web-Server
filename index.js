const express = require('express')
const mongoose = require('mongoose');
const dbConnect = require('./config/dbConnect');
const app = express();
require('dotenv').config()
// app.use(express.json());
// app.use(router)

dbConnect()


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(8000,() => {
  console.log("Server is running")
})