const express = require('express')
const mongoose = require('mongoose');
const dbConnect = require('./config/dbConnect');
const router = require('./router');
const { Server } = require("socket.io");
const http = require('http');
const cors = require("cors")
const app = express();
app.use(express.json());
app.use(cors())
app.use(router)
require('dotenv').config()
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: "*"
});
global.io = io

dbConnect()



httpServer.listen(5000, () => {
  console.log("Server is running")
})