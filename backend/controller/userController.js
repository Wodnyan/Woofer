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
