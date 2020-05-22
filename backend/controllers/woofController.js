const {User ,Woof} = require("../database/database.js");
const jwt = require("jsonwebtoken");

module.exports = (app) => {
  //Woofer API
  app.get("/api/woofer", (req, res)=>{
      Woof.find({}, null, {sort: "-postedOn"},(err, data)=>{
        if(err) console.error(err);
        res.json(data);
      })
  })
  //Woofer Api for individual users
  app.post("/api/woofer/user", async (req, res)=>{
    const {username} = req.body;
      User.findOne({username}, (err, userData) => {
        try{
          const {userInfo} = userData;
          Woof.find({user: username}, null, {sort: "-postedOn"}, (err, data)=>{
            if(err) console.error(err);
            res.json({
              userInfo,
              woofs: data
            })
          })
        }
        catch{
          res.sendStatus(404)
        }
    })
  })
  //Save Woofs
  app.post("/woofer", (req, res)=>{
    const {username, woof, postedOn} = req.body;
     new Woof({user: username, woof: woof, postedOn:  postedOn}).save((err)=>{
       if(err) console.error(err);
       res.json({foo: "bar"})
       console.log("Woof saved");
     })
  })
}
