const express = require('express')
const mongoose = require('mongoose');
const dbConnect = require('./config/dbConnect');
const router = require('./router');
const { Server } = require("socket.io");
const httpServer = require('http').createServer();
const cors = require("cors")
const app = express();
app.use(express.json());
app.use(cors())
app.use(router)
require('dotenv').config()

const io = new Server(httpServer, {
  cors: "*"
});
dbConnect()


app.listen(8000, () => {
  console.log("Server is running")
})