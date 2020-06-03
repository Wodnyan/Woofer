const {User, JWTRefresh} = require("../database/database.js");
const multer = require("multer");
const {hash, compare} = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const saltRounds = 10;
const maxImgSize = 200000;
const storage = multer.diskStorage({
  destination: "public/uploads/",
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + "." + file.mimetype.split("/")[1])
  }
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const {mimetype} = file;
    console.log(mimetype)
    if(mimetype === "image/png" || mimetype === "image/jpeg") return cb(null, true) 
    cb(new Error("File must be an image"))
    cb(null, false)
  },
  limits: {
    fileSize: maxImgSize
  }
})
  .single("image")
module.exports = (app)=>{
  //Post Profile Picture
  app.post("/upload/profile-picture", (req, res) => {
    upload(req, res, err => {
      if(err) {
        if(err.message === "File too large") return res.send({error:`File can't be larget than ${maxImgSize / 1000}KB`})
        if(err.message === "File must be an image") return res.send({error: err.message}) 
      }
      else{
        const {token} = req.cookies
        const {path} = req.file
        try {
          const {username} = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
          User.findOneAndUpdate({username: username}, {"userInfo.profilePicture": path}, (err, doc) => {
            if(err) console.error(err)
            const path = doc.userInfo.profilePicture;
            if(path){
              fs.unlink(path, (err) => {
                if(err) console.log(err)
                console.log("Successfully deleted")
                res.send("Success")
              })
            }
          })
        }
        catch(err) {
          console.error(err)
        }
      }
    })
  })
  //Send Profile Picture Link
  app.post("/user/profile-picture", (req, res) => {
    const {username} = req.body;
    User.findOne({username}, (err, data) => {
      if(err) console.error(err)
      if(!data) return res.send(null)
      const {profilePicture} = data.userInfo;
      return res.send(profilePicture);
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
  //Set User Descriptions
  app.post("/user/description", (req, res) => {
    const token = req.cookies.token;
    const {username} = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    User.updateOne({username: username}, {"userInfo.description": req.body.description}, (err, data) => {
      if(err) console.error(err);
      console.log(`${username} changed their description`);
      res.send("Description updated")
    })
  })
  //Get User Description
  app.get("/user/description", (req, res) => {
    const {username} = req.query;
    if(!username) return res.sendStatus(404)
    User.findOne({username}, "userInfo", (err, data) => {
      if(err) console.log(err)
      if(!data) return res.sendStatus(404) 
      else if(!data.userInfo.description) return res.send("No description has been set yet") 
      else{
        return res.send(data.userInfo.description)
      }
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
        //Extract this
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
