const express = require('express')
const mongoose = require('mongoose');
const dbConnect = require('./config/dbConnect');
const router = require('./router');
const app = express();
app.use(express.json());
app.use(router)
require('dotenv').config()


dbConnect()


app.listen(8000, () => {
  console.log("Server is running")
})