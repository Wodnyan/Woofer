const {User, Woof} = require("../database/database.js");
const jwt = require("jsonwebtoken");

module.exports = (app) => {
  //Woofer API
  app.get("/api/woofer", async (req, res)=>{
    const {from, to, username} = req.query;
    if(username) {
      Woof
        .find({user: username})
        .sort("-postedOn")
        .skip(parseInt(from))
        .limit(to - from)
        .exec((err, woofs) => {
          if(err) console.log(err)
          res.json(woofs)
        })
    }
    else{
      Woof
        .find({})
        .sort("-postedOn")
        .skip(parseInt(from))
        .limit(to - from)
        .exec((err, woofs) => {
          if(err) console.log(err)
          res.json(woofs)
        })
    }
  })

  //Save Woofs
  app.post("/woofer", (req, res)=>{
    const {token} = req.cookies;
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
      if(err) return res.sendStatus(401);
      else {
        console.log("Hurray")
      }
    })
    const {username, woof, postedOn} = req.body;
     new Woof({user: username, woof: woof, postedOn:  postedOn}).save((err)=>{
       if(err) console.error(err);
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
        return res.send("Comment successfully posted")
      })
    })
  })

  //Get Comments
  app.get("/api/comments", (req, res) => {
    const {woofId, from, to} = req.query;
    if(!woofId) return res.sendStatus(404);
    //Test ID: 5ee365aca35aba348ec07083   
    Woof
      .findById(woofId)
      .skip(parseInt(from))
      .limit(to - from)
      .exec((err, comments) => {
        if(err) res.sendStatus(404)
        else {
          res.json(comments.comments)
        }
      })
  })
}
