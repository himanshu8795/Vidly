const mongoose = require('mongoose')
const express = require('express');
const router = express.Router();

const joi = require('joi');
//const {Customer , validate} = require("../models/customer")

mongoose.connect('mongodb://localhost/customerdb')
    .then(()=> console.log('connected db'))
    .catch(err=> console.error('error',err))


const customerSchema = new mongoose.Schema({

    isGold : Boolean,
    name : String,
    phone : {
        type: String,
        default: true
    }

})

const Customer = mongoose.model('Customer',customerSchema)

async function createCustomer(){

    const customer = new Customer({
   
        isGold: true,
        name: 'Rohit',
        Phone: 8120341199
    })
    
    const result = await customer.save();
    console.log(result);
}
 //createCustomer();



 async function updateName(customerId){
     const customer = await Customer.findById(customerId);
     customer.name = "Himanshu Jo";
     customer.save()
 }

 //updateName('610f83b93b4e9f0650adea5f');


//
 async function getCustomer(){
     const customer = await Customer.find();
    console.log(customer);
 }
getCustomer();

 
// router.get('/',(req,res) => {
//     res.send("Welcome to vividly")
// })

// router.post('/api',(req, res) =>{
//     const { error } = validateMovie(req.body);
//     if(!error) return res.status(400).send(error.details[0].message); 

module.exports = router;