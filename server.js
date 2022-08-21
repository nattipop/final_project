if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const keys = require("./config/keys")

const indexRouter = require("./routes/index")

if(process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"))
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.use(cors());

app.use(express.static("public"));
app.use(bodyParser.json())

const mongoose = require("mongoose");
console.log(keys.MONGODB_URI)
mongoose.connect(keys.MONGODB_URI, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", error => console.log(error))
db.once("open", () => console.log("connected to database"))

app.use("/", indexRouter)

app.listen(process.env.PORT || 3000)