const express = require("express");
const app = express();
const userController = require("./controller/userController");
const port = 3000
app.listen(port, ()=>{
  console.log(`Server is listening on port ${port}`)
})
userController(app)
