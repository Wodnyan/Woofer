const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://user:user@my-cluster-jv3bc.mongodb.net/users?retryWrites=true&w=majority",{useNewUrlParser:true, useUnifiedTopology: true},(err)=>{
  if(err) console.error(err);
  console.log("Connected to Database");
})
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: String,
  password: String
})
const User = mongoose.model("Users", UserSchema);
module.exports = {
  User
}
