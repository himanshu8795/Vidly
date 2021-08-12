const express = require("express");
const mongoose = require('mongoose');
const joi = require("joi")
const genres = require("./routes/genres")
// const  customer= require('./routes/customers');
//const customer = require('./r1/cs1')
const app = express();


mongoose.connect('mongodb://localhost/vidly')
    .then(()=> console.log('connected db'))
    .catch(err=> console.error('error',err))



app.use("/",genres);
//app.use("/api/customer",customers)



const port = process.env.port || 3000;

app.listen(port, () => {console.log(`port no is ${port}`)}); 