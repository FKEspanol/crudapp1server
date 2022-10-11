const mongoose = require('mongoose');
const DB_URI = process.env.LOCAL_URI;

const connectDB = async() => {
   try {
      mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true});
   } catch (error) {
      console.error(error);
   }
}

module.exports = connectDB;