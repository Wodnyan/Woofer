const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://user:user@my-cluster-jv3bc.mongodb.net/woofer?retryWrites=true&w=majority",{useNewUrlParser:true, useUnifiedTopology: true},(err)=>{
  if(err) return console.error(err);
  console.log("Connected to Database");
})
mongoose.set('useFindAndModify', false);
const Schema = mongoose.Schema;
const WoofSchema = new Schema({
  user: String,
  woof: String,
  postedOn: String,
  comments: {
    type: Array, "default": []
  }
})
const UserSchema = new Schema({
  username: String,
  password: String,
  userInfo: {
    description: String,
    profilePicture: String
  }
})
const JWTSchema = new Schema({
  jwtToken: String 
})
const User = mongoose.model("Users", UserSchema);
const Woof = mongoose.model("Woofs", WoofSchema);
const JWTRefresh = mongoose.model("RefreshTokens", JWTSchema);
module.exports = {
  User,
  Woof,
  JWTRefresh
}
