require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const corsOptions = require('./config/corsConf');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const PORT = process.env.PORT || 5000;
const { requestLog, errorlog } = require('./middleware/logger');
const verifyJWT = require("./middleware/verifyJWT");

connectDB();

app.use(cors(corsOptions));
app.use(requestLog);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//middleware for cookies
app.use(cookieParser());

app.use(errorlog);
app.use("/registerUser", require("./routes/registerUser"));
app.use('/loginUser', require('./routes/loginUser'));
app.use('/refresh', require('./routes/refreshToken'));
app.use('/logoutUser', require('./routes/logoutUser'));



app.use(verifyJWT);
app.use('/', require('./routes/api/router'));

mongoose.connection.once('open', () => {
   console.log('Connected to mongodb');
   app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
});
