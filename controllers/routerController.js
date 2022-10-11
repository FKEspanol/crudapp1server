const User = require('../model/User');

const getAllUsers = async(request, response) => {
   try {
      const getAllUsers = await User.find({});
      response.status(200).json(getAllUsers);
   } catch (error) {
      response.status(500).json(error);
   }
}

module.exports = { getAllUsers };