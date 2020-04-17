const {User} = require("../database/database.js");
const {hash, compare} = require("bcrypt");
const saltRounds = 10;
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
module.exports = (app)=>{
  //LOGIN
  app.post("/user/login", (req,res)=>{
      const {username, password} = req.body;
      User.findOne({username: username}, async (err, data)=>{
        if(err) console.log("Foo");
        else if(data){
          const passIsCorrect = await compare(password, data.password);
          res.json(req.body);
        }
        else{
          console.log("No such username");
          res.json({error: "No such username"})
        }
      })
  })
  //REGISTER
  app.post("/user/signup", checkUserName, async (req,res)=>{
    const userInfo = req.body;
    const hashedPw = await hash(userInfo.password, saltRounds);
    new User({username: userInfo.username, password: hashedPw}).save((err)=>{
      if(err) console.error(err);
      console.log(`${userInfo.username} created an account`);
    })
    res.status(200).send(req.body);
  })
  app.get('/api/woofers',(req, res)=>{
    res.send("Woofer Api")
  })
};
