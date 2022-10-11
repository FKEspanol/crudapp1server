const argon = require('argon2');
const jwt = require('jsonwebtoken');
const User = require('../model/User');

const loginUser = async (request, response) => {
   const validationErrors = [];

   !request.body.email ? validationErrors.push({
      errMessage: `email is required`,
      propName: 'email'
   }) : '';

   !request.body.password ? validationErrors.push({
      errMessage: `password is required`,
      propName: 'password'
   }) : '';

   if (validationErrors.length) return response.status(400).json({ error: 1, errors: validationErrors });
   try {
      // check if user exists using email
      const currentUser = await User.findOne({ email: request.body.email }).exec();

      if (!currentUser) {
         validationErrors.push({
            errMessage: 'That email is not registered',
            propName: 'email'
         });
         return response.status(404).json({ error: 1, errors: validationErrors });
      }

      const passwordMatch = await argon.verify(currentUser.password, request.body.password);
      if (!passwordMatch) {
         validationErrors.push({
            errMessage: 'Password do not match',
            propName: 'password'
         });

         return response.status(400).json({ error: 1, errors: validationErrors })
      }

      const accessToken = jwt.sign(
         { "firstname": currentUser.firstname },
         process.env.ACCESS_TOKEN_SECRET,
         { expiresIn: '40s' }
      );
      const refreshToken = jwt.sign(
         { "firstname": currentUser.firstname },
         process.env.REFRESH_TOKEN_SECRET,
         { expiresIn: '1d' }
      );

      await User.findByIdAndUpdate({ _id: currentUser._id }, { $set: { refreshToken } });

      response.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
      response.status(200).json({ currentUser, accessToken });
   } catch (error) {
      console.error(error)
      response.status(500).json(error);
   }
}

module.exports = loginUser;