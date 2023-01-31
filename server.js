if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { ServerApiVersion } = require('mongodb');
const keys = require("./config/keys")
const path = require("path")

const indexRouter = require("./routes/index")

if(process.env.NODE_ENV === "production") {
  const path = require("path");

  app.use(express.static('client/build'));
}

app.use(cors());

app.use(express.static("public"));
app.use(bodyParser.json())

const mongoose = require("mongoose");
mongoose.connect(keys.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", error => console.log(error))
db.once("open", () => console.log("connected to database"))

app.use("/api/", indexRouter);
app.use(express.static(path.join(__dirname, '/../react_dist')));

app.listen(process.env.PORT || 3000)