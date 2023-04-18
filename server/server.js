const express = require("express");
const cors = require("cors");
const router = require("./routes/index.js");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);

app.listen(8080, () => {
  console.log("server listening at port 8080");
});
