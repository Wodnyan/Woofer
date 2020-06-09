require("dotenv").config()
const userController = require("./controllers/userController");
const handleSocket = require("./socket/handleSocket");
const woofController = require("./controllers/woofController");
const io = require("socket.io")
const cookieParser = require("cookie-parser")
const express = require("express");
const app = express();
const port = 3000;
app.use("/public", express.static("public"))
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});
app.use(express.json());
app.use(cookieParser())
//Server
let server = app.listen(port, ()=>{
	console.log(`Server is listening on port ${port}`)
})
//Socket
handleSocket(io(server, {origins: "*:*"}))
//Controllers
woofController(app)
userController(app)
