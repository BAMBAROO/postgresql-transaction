const express = require("express");
const pool = require("../config/index.js");
const { getUsersBank, transferMoney } = require("../controller/controller.js");

const router = express.Router();

router.get("/users", getUsersBank);
router.get("/", (req, res) => {
  console.log(req.url);
  res.send("Hello World!");
});
router.put("/transfer", transferMoney);

module.exports = router;
