const jwt = require('jsonwebtoken');
const User = require('../model/User');

const refreshTokenHandler = async(request, response) => {
   try {
      const cookies = request.cookies;
      if(!cookies?.jwt) return response.sendStatus(401);
      // console.log(cookies.jwt);

      const refreshToken = cookies.jwt;
      const user = await User.findOne({ refreshToken }).exec();
      // console.log(user)
      if(!user) return response.sendStatus(403);

      jwt.verify(
         refreshToken,
         process.env.REFRESH_TOKEN_SECRET,
         (err, decoded) => {
            //console.log(decoded)
            if(err || user.firstname !== decoded.firstname) return response.sendStatus(403);
            const accessToken = jwt.sign(
               { "name": decoded.name },
               process.env.ACCESS_TOKEN_SECRET,
               { expiresIn: '40s'}
            );

            response.json({ accessToken });
         }
      )
   } catch (error) {
      console.error(error)
      response.status(500).json(error);
   }
}

module.exports = refreshTokenHandler;