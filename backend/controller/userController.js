const {User, Woof} = require("../database/database.js");
const {hash, compare} = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
module.exports = (app)=>{
  //Check Auth
  app.post("/user/check", (req, res)=>{
    console.log(req.body)
    res.cookie("foo", "bar", {httpOnly: true});
    res.json(req.body);
  })
  //Woofer API
  app.get("/api/woofer", (req, res)=>{
      Woof.find({}, null, {sort: "-postedOn"},(err, data)=>{
        if(err) console.error(err);
        res.json(data);
      })
  })
  //Woofer Api for individual users
  app.post("/api/woofer/user", (req, res)=>{
    console.log(req.body);
    const {username} = req.body;
      Woof.find({user: username}, null, {sort: "-postedOn"}, (err, data)=>{
      if(err) console.error(err);
      res.json(data)
    })
  })
  //Save Woofs
  app.post("/woofer", (req, res)=>{
    const {username, woof, postedOn} = req.body;
    console.log(req.body);
     new Woof({user: username, woof: woof, postedOn:  postedOn}).save((err)=>{
       if(err) console.error(err);
       res.json({foo: "bar"})
       console.log("Woof saved");
     })
  })
  //LOGIN
  app.post("/user/login", (req, res)=>{
      const {username, password} = req.body;
      User.findOne({username: username}, async (err, data)=>{
        if(err) console.log("Foo")
        else if(!data){
          console.log(data);
            res.json({
              error: "No such username"
            })
        }
        else{
            try {
              const passIsCorrect = await compare(password, data.password);
              if(!passIsCorrect) res.json({error: "Incorrect Password"})
              else{
                const token = createToken({username});
                res.cookie("token", token, {httpOnly: true});
                res.json({username})
                console.log(`${username} logged in`);
              }
            }
            catch(err){
              console.error(err);
            }
          }
      })
  })
  //REGISTER
  app.post("/user/signup", checkUserName, async (req, res)=>{
    const {username, password} = req.body;
    console.log(username);
    const hashedPw = await hash(password, saltRounds);
    new User({username: username, password: hashedPw}).save((err)=>{
      if(err) console.error(err);
      console.log(`${username} created an account`);
    })
    const user = {
      username
    }
    const token = createToken(user);
    res.cookie("token", token, {httpOnly: false});
    res.json({user})
  })
};
function createToken(user){
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
}
//Middleware to check for duplicate usernames
function checkUserName(req, res, next){
  const {username} = req.body;
  User.findOne({username: username }, (err, foo)=>{
    if(err) console.error(err);
    else if(foo === null) next();
    else{
      console.log("Username Taken ");
      res.send({
        error: "Username Taken"
      })
      return;
    }
  })
}
