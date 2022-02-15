const moment = require('moment');

const loggerINFO = (req, res, next) => {

  const date = moment().format('DD-MM-yyyy HH:mm:ss A');
  console.log('################################');
  console.log(
    `LOGGER => method: ${req.method} | URL: ${req.originalUrl} | Fecha: ${date}`
  );
  console.log('################################');
  next();
};

const loggerDEBUG = (req, res, next) => {
  const date = moment().format('DD-MM-yyyy HH:mm:ss A');
  console.log('################################');
  console.log(
    `LOGGER => method: ${req.method} | URL: ${req.originalUrl} | Fecha: ${date}`
  );
  if (Object.keys(req.body).length) {
    console.log('input: ', req.body);
  } else {
    console.log('No input');
  }
  console.log('################################');
  next();
};


//Esto nos va a logear los datos del request
//TIPOS:
//INFO: Solo logea el metodo del request, la URL y la FECHA
//DEBUG: Lo mismo INFO + el input (tiene que dejarse en INFO cuando pase a MAIN)
module.exports = (req, res, next) => {
  const type = 'INFO';
  const loggers = {
    INFO: loggerINFO,
    DEBUG: loggerDEBUG,
  };

  return loggers[type](req, res, next);
};

