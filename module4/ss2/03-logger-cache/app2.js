const logger = require('./logger');
function run() {
  logger.warn('Thông báo từ app2');
  return logger;
}
module.exports = run;
