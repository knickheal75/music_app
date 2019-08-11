const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Schema for the user model

var userSchema = mongoose.Schema({
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String
  }
});

//methods
//generating hash

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//checking for valid password

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
