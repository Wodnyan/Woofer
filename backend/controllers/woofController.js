const {User ,Woof} = require("../database/database.js");
const jwt = require("jsonwebtoken");

module.exports = (app) => {
  //Woofer API
  app.get("/api/woofer", async (req, res)=>{
    const {from, to, username} = req.query;
    if(username) {
      const user = await User.findOne({username});
      if(!user) return res.sendStatus(404)
      const woofs = await Woof.find({user: username}, null, {sort: "-postedOn"});
      const slicedData = woofs.slice(from, to);
      return res.json(slicedData)
    }
    else{
      Woof.find({}, null, {sort: "-postedOn"},(err, data)=>{
        if(err) console.error(err);
        const slicedData = data.slice(from, to)
        return res.json(slicedData);
      })
    }
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
