const express = require("express");
const jwt = require('jwt-simple');
const router = express.Router()
const {User, MenuItem, Restaurant, Order} = require("../models/models")
const axios = require("axios");
const passport = require("passport");
require('../services/passport')
const keys = require("../config/keys")

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

// faker.locale = "en_US";

function tokenForUser(user) {
  return jwt.encode({ sub: user._id,
    iat: Math.round(Date.now() / 1000),
    exp: Math.round(Date.now() / 1000 + 5 * 60 * 60)}, keys.TOKEN_SECRET)
};

router.post("/auth/signup", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const firstName = req.body.first;
  const lastName = req.body.last;
  const birthdateStr = req.body.birthdate;
  const birthday = new Date(birthdateStr);
  const employeePass = req.body.employee_pin;
  const status = (employeePass === 239853) ? "employee" : "customer";

  if(!email || !password){
    res.status(422).send({ error: "You must provide email and password" })
  }

  User.findOne({ "login.email": email }, function(err, existingUser) {
    if (err) { return next(err); }

    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    const user = new User({
      login: {
        email: email
      },
      name: {
        first: firstName,
        last: lastName
      },
      birthday: birthday,
      status: status
    });

    user.setPassword(password);

    user.save(function(err, user) {
      if (err) { return next(err); }

      res.json({ token: tokenForUser(user), email: user.login.email });
    });
  });
})

router.post("/auth/signin", requireSignin, (req, res) => {
  console.log(tokenForUser(req.user))
  res.send({
    token: tokenForUser(req.user)
  });
})

router.get("/restaurant", async (req, res) => {
  const restaurant = await Restaurant.find();
  res.status(200).send(restaurant)
})

router.get("/orders/:orderId", requireAuth, (req, res) => {
  const { orderId } = req.params

  Order.findById(orderId, (err, order) => {
    if(err){
      res.status(500).send("There was an error with the format of you request");
      throw err;
    };
    if(!order[0]){
      res.status(404).send("Order not found");
    } else {
      res.status(200).send(order)
    }
  })
})

router.get("/users/by-email/:email", (req, res) => {
  const { user } = req.user;
  const { email } = req.params;
  console.log(user)

  if(user){
    res.status(200).send(user)
  }

  if(!user && email){
    User.find({ "login.email": email }, (err, user) => {
      if(err){
        res.status(500).send("There was an error with the format of your request");
        throw err;
      }
      if(!user[0]){
        res.status(404).send("User not found")
      } else {
        res.status(200).send(user)
      }
    })
  }
})

router.get("/user", requireAuth, (req, res) => {
  const user = req.user
  console.log(user)
  

  res.send(user);
});

router.get("/items", (req, res) => {
  MenuItem.find({}, (err, products) => {
    if(err){
      res.status(500).send("there was an error with the format of your request");
      throw err;
    }

    if(!products[0]){
      res.status(404).send("no products to show")
    } else {
      res.status(200).send(products)
    }
  })
});

//get items by availability 
router.get("/items/:time", (req, res) => {
  const { time } = req.params;

  MenuItem.find(
    {"availability.mon_fri.start": { $lt: time }, "availability.mon_fri.end": { $gt: time }},
    (err, products) => {
    if(err){
      res.status(500).send("there was an error with the format of your request");
      throw err;
    }

    if(!products[0]){
      res.status(404).send("no products to show")
    } else {
      res.status(200).send(products)
    }
  })
})

router.get("/items/:category", (req, res) => {
  const { category } = req.params;

  MenuItem.find({ "category": category }, (err, products) => {
    if(err){
      res.status(500).send("There was an error with the format of your request");
      throw err;
    };
    if(!products[0]) {
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
    if(!product[0]) {
      res.send(404).send("Product Not Found")
    } else {
      console.log(product)
      res.status(200).send(product)
    }
  })
});

router.post("/products", requireAuth, (req, res) => {
  if(req.body.title){
    if(req.body.description){
      if(req.body.category){
        const product = new MenuItem({
          title: req.body.title,
          description: req.body.description,
          picture: req.body.picture,
          price: req.body.price.toFixed(2),
          category: req.body.category,
          availability: {
            mon_fri: {
              start: req.body.mon_fri_start,
              end: req.body.mon_fri_end
            },
            sat: {
              start: req.body.sat_start,
              end: req.body.sat_end
            }
          },
          prep_time: req.body.prep_time
        });
        product.save();
        res.status(200).send("added product")
      } else {
        res.status(422).send("product category required")
      }
    } else {
      res.status(422).send("product description required")
    }
  } else {
    res.status(422).send("product title required")
  }

})

router.post("/orders", requireAuth, async (req, res, next) => {
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

router.put("/orders/:orderId", requireAuth, (req, res) => {
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
});

router.put("/users/cart/:userId", (req, res) => {
  const { userId } = req.params

  User.findOneAndUpdate({ _id: userId }, {"$push": {"cart": req.body}}, { "new": true }, (err, user) => {
      if(err){
        res.status(500).send("there was an error with your request")
      }
      res.status(200).send(user)
    })
});

router.put("/users/cart/edit/:userId", (req, res) => {
  const { userId } = req.params

  User.findOneAndUpdate({ _id: userId }, {"$set": { "cart": req.body }}, { "new": true}, (err, user) => {
    if(err){
      res.status(500).send("there was an error with your request")
    }
    res.status(200).send(user);
  })
})

router.delete("/orders/:orderId/:restaurantId", requireAuth, async (req, res) => {
  const { orderId, restaurantId } = req.params;

  if(orderId){
    if(restaurantId){
      Restaurant.findOneAndUpdate({ _id: restaurantId },
      {
        $pull: {
          "currentOrders": orderId,
        }
      }, (err) => {
        if(err){
          res.status(500).send("there was an error with your request")
        }

        Order.findByIdAndDelete(orderId, (err) => {
          if(err){
            res.status(500).send("there was an error with your request")
          } else {
            res.status(200).send(`successfully cleared order`)
          }
        })
      })

    } else {
      res.status(400).send("request must contain restaurant id")
    }
  } else {
    res.status(400).send("request must contain order id")
  }
})


//Generating data ---------------------------------------
// router.get("/generate-users", async function (req, res) {
//   console.log("generating users");
//   //generating users v v v
//   for(let i = 0; i < 12; i++){
//     const firstName = faker.name.firstName();
//     const lastName = faker.name.lastName();
//     const randomNum = Math.floor(Math.random() * 10);
//     const password = faker.internet.password(10);

//     let status = "customer"
//     if(randomNum > 8){
//       status = "employee"
//     }

//     let user = new User({
//       login: {
//         email: faker.internet.email(firstName, lastName)
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

//     user.setPassword(password);
//     user.save();
//   }
//   res.send("Users generated");
// });

// router.get("/generate-restaurant/:title", async (req, res) => {
//   // generating restaurant v v v
//   const {title} = req.params

//   const placeId = await axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${title}&inputtype=textquery&key=${process.env.API_KEY}`)

//   const owner = await User.findOne({"status": "owner"})
//   let menu = await MenuItem.find({}, {"_id": 1, "total": 1})
//   let employees = await User.find({ "status": "employee" }, {"_id": 1, "total": 1})

//   if(owner !== undefined){
//     let restaurant = new Restaurant({
//       title: title,
//       owner: owner,
//       menu: menu,
//       currentOrders: [],
//       employees: employees,
//       hours: {
//         mon_fri: {
//           open: "7:00:00",
//           close: "15:00:00"
//         },
//         sat: {
//           open: "8:00:00",
//           close: "15:00:00"
//         }
//       },
//       placeId: placeId.data.candidates[0].place_id
//     });
    
//     restaurant.save();
//     res.send("restaurant generated");
//   }
// })

module.exports = router;