const express = require("express");
const jwt = require('jwt-simple');
const router = express.Router()
const {User, MenuItem, Restaurant, Order, Image} = require("../models/models")
const axios = require("axios");
const passport = require("passport");
require('../services/passport')
const keys = require("../config/keys")
const crypto = require("crypto");
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });
const { upload, uploadImage } = require("../services/multer");

// faker.locale = "en_US";

function tokenForUser(user) {
  return jwt.encode({ sub: user._id,
    iat: Math.round(Date.now() / 1000),
    exp: Math.round(Date.now() / 1000 + 5 * 60 * 60)}, keys.TOKEN_SECRET)
};

router.post('/create-checkout-session', async (req, res) => {
  const { price } = req.body.price;

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: price,
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.url}?success=true`,
    cancel_url: `${process.env.url}?canceled=true`,
  });

  res.redirect(303, session.url);
});

router.put("/images/:userId", (req, res) => {
  const { userId } = req.params;
  console.log(req.body)

  User.findOneAndUpdate({ "_id": userId }, {"$set": { "picture.profile": req.body }}, { "new": true }, (err, user) => {
    if(err) {
      res.send(err)
    } else {
      res.status(200).send(user)
    }
  })
})

router.post("/auth/signup", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const firstName = req.body.first;
  const lastName = req.body.last;
  const birthdateStr = req.body.birthdate;
  const birthday = new Date(birthdateStr);
  const employeePass = req.body.employee_pin;
  const status = (employeePass == 239853) ? "employee" : "customer";

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
  res.send({
    token: tokenForUser(req.user)
  });
})

router.get("/restaurant", async (req, res) => {
  const restaurant = await Restaurant.find();
  res.status(200).send(restaurant)
})

router.get("/images/:imageId", (req, res) => {
  const { imageId } = req.params
  Image.find({ _id: imageId }, (err, images) => {
    if(err){
      res.status(500).send(err)
    }
    if(images){
      res.status(200).send(images)
    } else {
      res.status(404).send("no images found")
    }
  })
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

router.get("/test", (req, res) => {
  res.send("WORKS")
});

router.get("/set", (req, res) => {
  const user = new User();
  const restaurant = new Restaurant();
  const item = new MenuItem();
  const order = new Order();

  user.save();
  restaurant.save();
  item.save();
  order.save();

  res.send(user, restaurant, item, order)
})

router.get("/users/by-email/:email", (req, res) => {
  const { email } = req.params;

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
})

router.get("/user", requireAuth, (req, res) => {
  const user = req.user
  
  if(user){
    res.status(200).send(user);
  } else {
    res.status(404).send("not found")
  }
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
    {"availability.start": { $lt: time }, "availability.end": { $gt: time }},
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

router.post("/image/upload", uploadImage, upload)

router.post("/products", async (req, res) => {
  if(req.body.title){
    if(req.body.description){
      if(req.body.category){
        const item = await stripe.products.create({name: req.body.title})
        const price = await stripe.prices.create({
          product: item.id,
          unit_amount: 2000,
          currency: 'usd',
        });
        const product = new MenuItem({
          title: req.body.title,
          description: req.body.description,
          picture: req.body.picture,
          price: {
            Small: req.body.price.small,
            Medium: req.body.price.medium,
            Large: req.body.price.large
          },
          category: req.body.category,
          availability: {
            start: req.body.start,
            end: req.body.end
          },
          prep_time: req.body.prep_time,
          price_id: price.id
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

router.post("/orders", requireAuth, (req, res, next) => {
  const user = req.user;
  const order = req.body;

  const generateId = crypto.randomUUID()

  const config = {
    headers: {
      "Authorization": "Bearer EAAAEL03fyJ103CWwetYFfh5XlopfvBeply3gUFYKDc7TOiW6Nn1E7zvfgACJKg0",
      "Square-Version": "2022-8-23"
    }
  }
  const price = parseInt(order.priceTotal)
  console.log(price === 14)
  const data = {
    "amount_money": {
      "amount": order.priceTotal,
      "currency": "USD"
    },
    "idempotency_key": generateId,
    "source_id": "cnon:card-nonce-ok"
  }

  axios.post("https://connect.squareupsandbox.com/v2/payments", data, config).then(response => {
    res.send(response.data)
  }).catch(err => {
    res.send(err)
  })
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

router.put("/user/:userId", (req, res) => {
  const { userId } = req.params;
  const path = req.body.path;
  const value = req.body.value;

  User.findOneAndUpdate({ _id: userId }, { "$set": { [path]: value }}, { "new": true }, (err, user) => {
    if(err){
      res.status(500).send("there was an error with your request")
    }
    res.status(200).send(user)
  })
})

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