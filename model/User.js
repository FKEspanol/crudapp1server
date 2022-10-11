const mongoose = require("mongoose");

const schema = new mongoose.Schema({
   firstname: {
      type: String,
      required: true
   },
   lastname: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   },

   refreshToken: {
      type: String,
      default: null
   }
});

module.exports = mongoose.connection.model('users', schema);