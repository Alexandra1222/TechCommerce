const moment = require('moment');
const onHeaders = require('on-headers');
const onFinished = require('on-finished');

const data = {
  type: 'INFO', //INFO o DEBUG
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
  data.method = req.method;
  data.originalUrl = req.originalUrl;
  data.input = req.body;
  data.date = moment().format('DD-MM-yyyy HH:mm:ss A');
  onHeaders(res, data.recordStartTime);
  onFinished(res, logRequest);
  next();
};

module.exports = (req, res, next) => {
  return logger(req, res, next);
};
