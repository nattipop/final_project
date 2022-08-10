const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MenuItem = new Schema({
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
  cart: [MenuItem],
  points: Number,
  picture: {
    profile: String,
    cover: String
  },
  birthday: String
});

const OrderSchema = new Schema({
  placed: Date,
  due: Date,
  placed_by: String,
  items: [MenuItem],
  before_tax: Number,
  tax: String,
  discount: String,
  total: Number,
  ready: Boolean,
  recieved: Boolean
})

const restaurantSchema = new Schema({
  title: String,
  owner: UserSchema,
  menu: [MenuItem],
  currentOrders: Array,
  employees: [UserSchema],
  hours: {
    mon_fri: {
      open: String,
      close: String
    },
    sat: {
      open: String,
      close: String
    }
  },
  placeId: String
})


exports.User = mongoose.model("user", UserSchema);
exports.MenuItem = mongoose.model('foodItem', MenuItem);
exports.Restaurant = mongoose.model('restaurant', restaurantSchema);
exports.Order = mongoose.model('order', OrderSchema);