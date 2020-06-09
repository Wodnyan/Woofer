const {User, Woof} = require("../database/database.js");
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
    //Secure this
    const {token} = req.cookies;
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
      if(err) return res.sendStatus(401);
      else {
        console.log(data)
      }
    })
    const {username, woof, postedOn} = req.body;
     new Woof({user: username, woof: woof, postedOn:  postedOn}).save((err)=>{
       if(err) console.error(err);
       //Change this
       res.json({foo: "bar"})
       console.log("Woof saved");
     })
  })

  //Post Comments
  app.post("/api/comments", (req, res) => {
    const {token} = req.cookies;
    console.log(req.body)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
      if(err) return res.sendStatus(401)
      const comment = {
        username: data.username,
        comment: req.body.comment,
        postedOn: req.body.postedOn,
      }
      Woof.findOneAndUpdate({_id: req.body.woofId}, {$push: {comments: comment}}, (err, doc) => {
        if(err) return res.sendStatus(404);
        console.log(doc)
      })
    })
  })

  //Get Comments
  app.get("/api/comments", (req, res) => {
    const {woofId} = req.query;
    Woof.findById(woofId, (err, data) => {
      if(err) return res.send([]);
      else if(!data) return res.sendStatus(404)
      res.json(data.comments)
    })
  })
}
