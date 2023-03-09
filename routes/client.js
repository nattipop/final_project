const express = require("express");
const clientRouter = express.Router();
const keys = require("../config/keys");

router.get("/verify-user-email/:token", (req, res) => {
  const { token } = req.params();
  console.log(token)
});

module.exports = clientRouter;