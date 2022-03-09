const moment = require('moment');
const onHeaders = require('on-headers');
const onFinished = require('on-finished');
const data = {
  type: 'INFO',
  method: undefined,
  originalUrl: undefined,
  input: undefined,
  date: undefined,
  _startTime: undefined,
  recordStartTime() {
    this._startTime = process.hrtime();
  },
};
function logRequest() {
  const { method, originalUrl, date, input } = data;
  const end = process.hrtime(data._startTime);
  const timeInMs = (end[0] * 1000000 + end[1]) / 1000000000; // convert first to ns then to ms
  // console.log(now);
  console.log('----------------------------------');
  console.log(
    `LOGGER => method: ${method} | URL: ${originalUrl} | Fecha: ${date} | ${timeInMs.toFixed(
      0
    )}ms`
  );
  if (data.type === 'DEBUG') {
    if (Object.keys(input).length) {
      console.log('input: ', input);
    } else {
      console.log('No input');
    }
  }
}

const logger = (req, res, next) => {
  // record request start
  data.method = req.method;
  data.originalUrl = req.originalUrl;
  data.input = req.body;
  data.date = moment().format('DD-MM-yyyy HH:mm:ss A');
  onHeaders(res, data.recordStartTime);
  onFinished(res, logRequest);
  next();
};

//Esto nos va a logear los datos del request
//TIPOS:
//INFO: Solo logea el metodo del request, la URL y la FECHA
//DEBUG: Lo mismo INFO + el input (tiene que dejarse en INFO cuando pase a MAIN)
module.exports = (req, res, next) => {
  return logger(req, res, next);
};
