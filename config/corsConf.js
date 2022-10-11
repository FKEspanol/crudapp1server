const allowOrigin = ["http://localhost:3000", "http://127.0.0.1:5500"];

const corsOptions = {
   origin: function (origin, cb) {
      if (allowOrigin.indexOf(origin) !== -1 || !origin)
         return cb(null, true);
      cb(new Error('Not allowed by CORS'));
   },

   optionsSuccessStatus: 200
}

module.exports = corsOptions;