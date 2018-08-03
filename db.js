const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name:{type:String, required:true},
    usn:{type:String, required:true},
    phone:{type:String , required:true},
    branch:{type:String, required:true},
    gender:{type:String, required:true}
});

const User=mongoose.model('user',userSchema);

let saveUser = (data, callback) => {
    let user = new User(data);
    User.find({email: data.email}, (err, doc) => {
      console.log(doc)
      if(doc.length >= 1)
        return callback('Already Subscribed', false)
      else
        user.save((err, success) => {
          callback(err, success);
        })
    })
  }
  module.exports = {
    saveUser
  }