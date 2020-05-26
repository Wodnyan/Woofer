const {User, JWTRefresh} = require("../database/database.js");
const multer = require("multer")
const {hash, compare} = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const storage = multer.diskStorage({
  destination: "public/uploads/",
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + "." + file.mimetype.split("/")[1])
  }
});
const upload = multer({storage: storage})
module.exports = (app)=>{
  //Post Profile Picture
  app.post("/upload/profile-picture", upload.single("image"), (req, res) => {
    const {token} = req.cookies
    const {path} = req.file
    console.log(path)
    try {
      const {username} = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      User.findOneAndUpdate({username: username}, {"userInfo.profilePicture": "FooBar"}, (err, doc) => {
        if(err) console.error(err)
        res.send("Success")
      })
    }
    catch(err) {
      console.error(err)
    }
  })
  //Get Profile Picture Link
  app.get("/user/profile-picture", (req, res) => {
    const {token} = req.cookies;
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
      if(err) res.sendStatus(403)
      //Check DB here
      console.log(data) 
    })
  })
  //Delete User
  app.delete("/user/delete", (req, res) => {
    const token = req.cookies.token;
    const {username} = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    User.deleteOne({username}, (err) => {
      if(err) res.send("Error")
      res.cookie("token", "", {expires: new Date(Date.now() + 100)})
      console.log(`${username} deleted their account`)
      res.send("Deleted Account")
    }) 
  })
  //User Descriptions
  app.post("/user/description", (req, res) => {
    const token = req.cookies.token;
    const {username} = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    User.updateOne({username: username}, {"userInfo.description": req.body.description}, (err, data) => {
      if(err) console.error(err);
      console.log(`${username} changed their description`);
      res.send("Description updated")
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
                //Schema jwtToken:String
                const refreshToken = jwt.sign({username}, process.env.REFRESH_TOKEN_SECRET);
                new JWTRefresh({jwtToken: refreshToken}).save((err) => {
                  if(err) console.err(err);
                })
                res.cookie("refreshToken", refreshToken, {httpOnly: true});
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
    const refreshToken = jwt.sign( user, process.env.REFRESH_TOKEN_SECRET);
    new JWTRefresh({jwtToken: refreshToken}).save((err) => {
      if(err) console.err(err);
    })
    res.cookie("refreshToken", refreshToken, {httpOnly: true});
    res.cookie("token", token, {httpOnly: true});
    res.json({user})
  })
  //Delete cookie on logout
  app.delete("/logout", (req, res) => deleteRefreshToken(req.cookies.refreshToken, res))
  //Check Auth
  app.post("/user/check", (req, res)=>{
    const token = req.cookies.token
    try{
      const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      if(verified){
        res.json({
          verified: true,
          username: verified.username
        });
      }
    }
    catch(err){
      const refreshToken = req.cookies.refreshToken;
      if(!refreshToken) return res.json({verified: false})
      if(err.message === "invalid token") return deleteRefreshToken(refreshToken, res)
        JWTRefresh.findOne({jwtToken: refreshToken}, (err, token) => {
          if(!token) {
            return res.json({verified: false})
          }
          jwt.verify(token.jwtToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
            if(err) return deleteRefreshToken(refreshToken, res);
            const {username} = data;
            const newToken = createToken({username}) 
            res.cookie("token", newToken, {httpOnly: true})
            res.json({verified: true})
          })
      })
    }
  })
};

/***
 TODO: Export these into a different file
***/
function createToken(user){
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "30m"});
}
function deleteRefreshToken(token, res) {
  JWTRefresh.deleteOne({jwtToken: token}, (err, data) => {
    if(err) console.error(err)
    res.cookie("token", "", {expires: new Date(Date.now() + 100)})
    return res.json({verified: false});
  })
}
//Middleware to check for duplicate usernames
function checkUserName(req, res, next){
  const {username} = req.body;
  User.findOne({username: username }, (err, foo)=>{
    if(err) console.error(err);
    else if(foo === null) next();
    else{
      res.send({
        error: "Username Taken"
      })
      return;
    }
  })
}
