const logger = require('./logger');
function run() {
  logger.info('Thông báo từ app1');
  return logger;
}
module.exports = run;
