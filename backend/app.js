require("dotenv").config()
const userController = require("./controller/userController");
const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
app.use(express.json());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization');
  next();
});
//Server
app.listen(port, ()=>{
  console.log(`Server is listening on port ${port}`)
})
userController(app)
