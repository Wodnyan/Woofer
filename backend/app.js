require("dotenv").config()
const userController = require("./controller/userController");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
app.use(express.json());
app.use(cookieParser())
app.use(cors());
//Server
app.listen(port, ()=>{
  console.log(`Server is listening on port ${port}`)
})
userController(app)
