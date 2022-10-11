const { v4: uuid } = require("uuid");
const fsPromises = require("fs").promises;
const fs = require('fs');
const path = require('path');
const date = require('../libs/dateFormats');

const logEvents = async(message, logFile) => {
   const getDate = date.getFullDate();
   const logItem = `${getDate}\t${uuid()}\t${message}`;

   try {
      if(!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
         await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
         await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFile), logItem,);
      } else   
         await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFile), logItem,);
   } catch (error) {
      console.error(error)
   }
}

const requestLog = (request, response, next) => {
   logEvents(`${request.method}\t${request.headers.origin}\t${request.url}\n`, 'requestLog.txt');
   next();
}

const errorlog = (err, request, response, next) => {
   logEvents(`${err.name}\t${err.message}\n`, 'errorLog.txt');
   next();
}

module.exports = {
   requestLog,
   errorlog
}