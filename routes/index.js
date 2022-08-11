const express = require("express");
const router = express.Router()
const {User, MenuItem, Restaurant, Order} = require("../models/models")
const {faker} = require("@faker-js/faker");
const axios = require("axios");

faker.locale = "en_US";

router.get("/restaurant", async (req, res) => {
  const restaurant = await Restaurant.find();
  res.status(200).send(restaurant)
})

router.get("/orders/:orderId", (req, res) => {
  const { orderId } = req.params

  Order.findById(orderId, (err, order) => {
    if(err){
      res.status(500).send("There was an error with the format of you request");
      throw err;
    };
    if(!order){
      res.status(404).send("Order not found");
    } else {
      res.status(200).send(order)
    }
  })
})

router.get("/users/:userId", (req, res) => {
  const { userId } = req.params

  User.findById(userId, (err, user) => {
    if(err){
      res.status(500).send("There was an error with the format of your request");
      throw err;
    };
    if(!user) {
      res.status(404).send("User not found")
    } else {
      res.status(200).send(user)
    }
  })
});

router.get("/items/:category", (req, res) => {
  const { category } = req.params;

  MenuItem.find({ "category": category }, (err, products) => {
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
  
  MenuItem.find({ "_id": productId }, (err, product) => {
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
});

router.post("/orders", async (req, res, next) => {
  if(req.body.user){
    const restaurantId = req.body.restaurant_id;
    const orderPlaced = new Date()
    let orderTotal = 0;
    const wi_tax = 0.05;
    const items = req.body.user.cart;
    let discount = 0;
    let prepTime = 5;
    
    const restaurant = await Restaurant.findById(restaurantId)

    items.forEach((item) => {
      orderTotal += item.price;
      
      if(item.prep_time > 5){
        prepTime = item.prep_time;
      }
    })
    
    if(req.body.user.status === "owner"){
      discount = 1
    };
    if(req.body.user.status === "employee"){
      discount = 0.1
    }
    
    const total = orderTotal - (orderTotal * discount);
    const finalTotal = total + (total * wi_tax);
    const order = new Order({
      restaurant_id: restaurant._id,
      placed: orderPlaced.toString(),
      due: new Date(orderPlaced.getTime() + prepTime * 60000).toString(),
      placed_by: `${req.body.user.name.first} ${req.body.user.name.last}`,
      items: items,
      before_tax: orderTotal,
      tax: `${wi_tax * 100}%`,
      discount: `${discount * 100}%`,
      total: finalTotal.toFixed(2),
      ready: false,
      recieved: false
    });

    order.save((err, order) => {
      if(err){
        res.send(err)
      }
      Restaurant.findOneAndUpdate(
      { _id: restaurantId },
      {
        $addToSet: {
          "currentOrders": order._id,
        }
      }, (err, restaurant) => {
        if(err){
          throw err
        }
        res.status(200).send("order placed!")
      })
    });
  } else {
    res.status(400).send("Cannot place an empty order")
  }
});

router.put("/orders/:orderId", (req, res) => {
  const { orderId } = req.params

  for(key in req.body) {
    Order.findById(orderId, (err, order) => {
      if(err){
        res.status(500).send("there was an error with your request")
      }
      for(key in req.body) {
        if(key in order) {
            order[key] = req.body[key];
        }
      }
      order.save((err) => {
        if(err){
          res.status(500).send("there was an error with your request")
        }
        res.end("order updated")
      });
    })
  }
})

router.delete("/orders/:orderId/:restaurantId", async (req, res) => {
  const { orderId, restaurantId } = req.params;

  if(orderId){
    if(restaurantId){
      const restaurant = await Restaurant.findById(restaurantId);

      Order.findByIdAndDelete(orderId, (err) => {
        if(err){
          throw err;
        } else {
            res.status(200).send(`Successfully cleared order`)
          }
      })
    } else {
      res.status(400).send("request must contain restaurant id")
    }
  } else {
    res.status(400).send("request must contain order id")
  }
})


//Generating data ---------------------------------------
router.get("/generate-users", async function (req, res) {
  console.log("generating users");
  //generating users v v v
  let users = [];
  for(let i = 0; i < 12; i++){
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const randomNum = Math.floor(Math.random() * 10);

    let status = "customer"
    if(randomNum > 8){
      status = "employee"
    }

    let user = new User({
      login: {
        email: faker.internet.email(firstName, lastName),
        password: faker.internet.password(10)
      },
      name: {
        first: firstName,
        last: lastName
      },
      status: status,
      cart: [],
      picture: {
        profile: faker.image.people(300, 250, true),
        cover: faker.image.abstract(640, 480, true)
      },
      birthday: faker.date.birthdate({min: 18, max: 70, mode: "age"})
    });

    user.save();
    users.push(user)
  }
  res.send("Users generated");
});

router.get("/generate-restaurant/:title", async (req, res) => {
  // generating restaurant v v v
  const {title} = req.params

  const placeId = await axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${title}&inputtype=textquery&key=${process.env.API_KEY}`)

  const owner = await User.findOne({"status": "owner"})
  let menu = await MenuItem.find({}, {"_id": 1, "total": 1})
  let employees = await User.find({ "status": "employee" }, {"_id": 1, "total": 1})

  if(owner !== undefined){
    let restaurant = new Restaurant({
      title: title,
      owner: owner,
      menu: menu,
      currentOrders: [],
      employees: employees,
      hours: {
        mon_fri: {
          open: "7:00:00",
          close: "3:00:00"
        },
        sat: {
          open: "8:00:00",
          close: "3:00:00"
        }
      },
      placeId: placeId.data.candidates[0].place_id
    });
    
    restaurant.save();
    res.send("restaurant generated");
  }
})

module.exports = router;