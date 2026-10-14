const logger = require('./logger');
function run() {
  logger.error('Thông báo từ app3');
  return logger;
}
module.exports = run;
