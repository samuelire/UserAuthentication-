// const mongoose = require('mongoose');

// const Schema = mongoose.Schema;

// const UserSchema = new Schema({
//   Name: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   password: {
//     type: String,
//     required: true
//   }
// });

// const UserModel = mongoose.model('user', UserSchema);

// module.exports = UserModel;

const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/Login-reg");

connect.then(()=> {
  console.log("Dataase connected Successfully");
})
.catch(() => {
  console.log("Database cannot be connected");
});

const LoginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});
const collection = new mongoose.model("Users", LoginSchema);

module.exports = collection;