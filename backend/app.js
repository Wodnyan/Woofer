require("dotenv").config()
const userController = require("./controller/userController");
const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
app.use(express.json());
app.use(cors());
//Server
app.listen(port, ()=>{
  console.log(`Server is listening on port ${port}`)
})
userController(app)
