const argon = require('argon2');
const User = require('../model/User');
const validateRequestBody = require("../libs/validateForm");

const registerUser = async(request, response) => {
   const validationErrors = [];

   const errors = validateRequestBody(request); // returns an array of errors object. See more info about this function in "../libs/validateForm.js"
   if(errors.length) {
      validationErrors.push(...errors)
      return response.status(400).json({ error: 1, errors: validationErrors});
   }
   try {
      // check if the email is already taken
      const duplicateEmail = await User.findOne({ email: request.body.email }).exec();
      if(duplicateEmail) {       
         validationErrors.push({
            errMessage: 'That email already exist, try another one',
            propName: 'email'
         });

         return response.status(400).json({ error: 1, errors: validationErrors});
      }

      const hashedPass = await argon.hash(request.body.password)
      const newUser = await User.create({...request.body, password: hashedPass});
      //*console.log(newUser)
      response.status(201).json(newUser);
      
   } catch (error) {
      console.error(error);
      response.status(500).json(error);
   }
}

module.exports = registerUser;