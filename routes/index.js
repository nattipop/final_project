const express = require("express");
const router = express.Router()
const {User, FoodItem} = require("../models/models")
const {faker} = require("@faker-js/faker")

faker.locale = "en_US";

router.get("/users/:userId", (req, res) => {
  const { userId } = req.params

  User.findById(userId, (err, user) => {
    if(err){
      res.status(500).send("There was an error with the format of your request");
      throw err;
    };
    if(!user) {
      res.send(404).send("User not found")
    } else {
      res.status(200).send(user)
    }
  })
});

router.get("/items/:category", (req, res) => {
  const { category } = req.params;

  FoodItem.find({ "category": category }, (err, products) => {
    if(err){
      res.status(500).send("There was an error with the format of your request");
      throw err;
    };
    if(!products) {
      res.send(404).send("No Products To Show")
    } else {
      res.status(200).send(products)
    }
  })
});

router.get("/items/product/:productId", (req, res) => {
  const { productId } = req.params;
  
  FoodItem.find({ "_id": productId }, (err, product) => {
    if(err){
      res.status(500).send("There was an error with the format of your request");
      throw err;
    };
    if(!product) {
      res.send(404).send("Product Not Found")
    } else {
      console.log(product)
      res.status(200).send(product)
    }
  })
})

// router.get("/generatefaker", (req, res) => {
//   console.log("generating fake data");
//   let users = [];
//   for(let i = 0; i < 12; i++){
//     const firstName = faker.name.firstName();
//     const lastName = faker.name.lastName();
//     const randomNum = Math.floor(Math.random() * 10);

//     let status = "customer"
//     if(randomNum === 1){
//       status = "owner"
//     }
//     if(randomNum > 8){
//       status = "employee"
//     }

//     let user = new User({
//       login: {
//         email: faker.internet.email(firstName, lastName),
//         password: faker.internet.password(10)
//       },
//       name: {
//         first: firstName,
//         last: lastName
//       },
//       status: status,
//       cart: [],
//       picture: {
//         profile: faker.image.people(300, 250, true),
//         cover: faker.image.abstract(640, 480, true)
//       },
//       birthday: faker.date.birthdate({min: 18, max: 70, mode: "age"})
//     });

//     user.save();
//     users.push(user)
//   }
//   res.send("Users generated")
// })

module.exports = router;