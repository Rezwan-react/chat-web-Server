const mongoose = require('mongoose');


const dbConnect = ()=>{
    mongoose.connect("mongodb+srv://chatweb:XG3OWVqwt04Sxlod@cluster0.f3vpn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
      .then(() => console.log('Connected!'));
}


module.exports = dbConnect;