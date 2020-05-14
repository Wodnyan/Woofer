const {User} = require("../database/database.js");
const {hash, compare} = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

module.exports = (app)=>{
  //User Descriptions
  app.post("/user/description", (req, res) => {
    const token = req.cookies.token;
    const {username} = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    User.updateOne({username: username}, {userInfo: {description: req.body.description}}, (err) => {
      if(err) console.error(err);
      console.log(`${username} changed their description`);
    })
  })
  //LOGIN
  app.post("/user/login", (req, res)=>{
      const {username, password} = req.body;
      User.findOne({username: username}, async (err, data)=>{
        if(err) console.log("Foo")
        else if(!data){
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
  //Delete cookie on logout
  app.post("/cookie", (req, res) => {
    res.cookie("token", "", {expires: new Date(Date.now() + 100)})
    res.send("Cookie Deleted")
  })
  //Check Auth
  app.post("/user/check", (req, res)=>{
    const token = req.cookies.token
    try{
      const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      if(verified){
        console.log(verified);
        res.json({
          verified: true,
          username: verified.username
        });
      }
    }
    catch(err){
      res.json({verified: false})
    }
  })
};

/***
 TODO: Export these into a different file
***/
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
