const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://user:user@my-cluster-jv3bc.mongodb.net/woofer?retryWrites=true&w=majority",{useNewUrlParser:true, useUnifiedTopology: true},(err)=>{
  if(err) console.error(err);
  console.log("Connected to Database");
})
const Schema = mongoose.Schema;
const WoofSchema = new Schema({
  user: String,
  woof: String,
  postedOn: String,
})
const UserSchema = new Schema({
  username: String,
  password: String,
  userInfo: {
    description: String
  }  
})
const User = mongoose.model("Users", UserSchema);
const Woof = mongoose.model("Woofs", WoofSchema);
module.exports = {
  User,
  Woof
}
