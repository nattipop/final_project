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

const indexRouter = require("./routes/index");

if(process.env.NODE_ENV === "production") {
  const path = require("path");

  app.use(express.static('client/build'));
}

app.use(cors());

app.use(express.static("public"));
app.use(bodyParser.json())

const mongoose = require("mongoose");
const { default: Menu } = require("./client/src/components/Menu");
mongoose.connect(keys.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", error => console.log(error))
db.once("open", () => console.log("connected to database"))

app.get('/', (req, res) => {
  const app = ReactDOMServer.renderToString(<Menu />);
  const indexFile = path.resolve('./build/index.html');

  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    );
  });
});

app.use(express.static('./build'));

app.use("/api", indexRouter);

app.listen(process.env.PORT || 3000)