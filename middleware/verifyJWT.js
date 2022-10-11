const jwt = require('jsonwebtoken');

const verifyJWT = (request, response, next) => {
   const authHeader = request.headers['authorization'];
   if (!authHeader) return response.sendStatus(401);
   //console.log(request.headers);

   const token = authHeader.split(' ')[1];
   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, {}, (err, decoded) => {
      if (err) {
         console.log(err)
         return response.sendStatus(403);
      }
      console.log(decoded);
      next();
   });
}

module.exports = verifyJWT;