const {User} = require("../database/database.js");
new User({username: "foobar", password: "barFoo"}).save((err)=>{
  if(err) console.error(err);
  console.log("Saved User");
})
const {hash, compare} = require("bcrypt");
const saltRounds = 10;
const plainPassword = "Foobar";
module.exports = (app)=>{
  app.post("/user/login",(req,res)=>{
      console.log(req.body);
      res.json(req.body);
  })
  app.post("/user/signup",(req,res)=>{
    console.log(req.body);
    res.json(req.body)
  })
  // TODO: Create an api
};
