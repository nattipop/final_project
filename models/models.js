const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");

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
    hash: String,
    salt: String
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
  birthday: String,
});

UserSchema.methods.setPassword = function(password){
  this.login.salt = crypto.randomBytes(16).toString('hex');
  this.login.hash = crypto.pbkdf2Sync(password, this.login.salt, 1000, 64, 'sha512').toString('hex');
};

UserSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.login.salt, 1000, 64, 'sha512').toString('hex');

  return this.login.hash === hash;
};

const OrderSchema = new Schema({
  restaurant_id: {type: Schema.Types.ObjectId, ref: "restaurant"},
  placed: Date,
  due: Date,
  placed_by: String,
  items: Array,
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
  menu: [{type: Schema.Types.ObjectId, ref: "menuItem"}],
  currentOrders: [{type: Schema.Types.ObjectId, ref: "order"}],
  employees: [{type: Schema.Types.ObjectId, ref: "user"}],
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
exports.MenuItem = mongoose.model('menuItem', MenuItem);
exports.Restaurant = mongoose.model('restaurant', restaurantSchema);
exports.Order = mongoose.model('order', OrderSchema);