const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Genre, validate } = require("../models/genre");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const genres = await Genre.find()
    .select("-__v")
    .sort("name");
  res.send(genres);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();

  res.send(genre);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true
    }
  );

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const genre = await Genre.findById(req.params.id).select("-__v");

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

module.exports = router;

//-------------------------------------------------------------------- course.js 

// const express = require("express");
// const router = express.Router();
// const joi = require("joi");


// router.use(express.json());

// const genre = [
//     { id : 1, name : "Horror"  },
//     { id : 2, name : "comedy"  }
// ];

//     router.get('/',(req,res) => {
//     res.send("Welcome to vividly")
// })

//     router.get('/api',(req, res) => {
//     //
    
//     res.send("genres name")

// })

//      router.get('/api/genre',(req, res) => {
//     res.send(genre)
// })


// router.get('/api/:id',(req, res) => {
//    const genres = genre.find(m => m.id === parseInt(req.params.id))
//    if(!genres) res.status(404).send('The genre given id was wrong');
//     res.send(genres)
// })

// router.post('/api',(req, res) =>{
//     const { error } = validategenre(req.body);
//     if(!error) return res.status(400).send(error.details[0].message);

//     const genre = {
//         id : genres.length+1,
//         genre :req.body.genre,
//         name : req.body.name
//     };
//     genres.push(genre);
//     res.send(genre)
// })

// module.exports = router;