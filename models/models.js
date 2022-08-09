const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FoodSchema = new Schema({
  title: String,
  description: String,
  picture: String,
  category: String,
  price: String,
  availability: {
    mon_fri: {
      start: String,
      end: String
    },
    sat: {
      start: String,
      end: String,
    }
  },
  prep_time: String
});

const UserSchema = new Schema({
  login: {
    email: String,
    password: String
  },
  name: {
    first: String,
    last: String
  },
  status: String,
  cart: [FoodSchema],
  points: Number,
  picture: {
    profile: String,
    cover: String
  },
  birthday: String
});


exports.User = mongoose.model("user", UserSchema);
exports.FoodItem = mongoose.model('foodItem', FoodSchema)