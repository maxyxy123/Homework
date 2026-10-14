require('dotenv').config();
let initCount = 0;
initCount += 1; // chỉ thực thi khi Node thực sự nạp module này
const priority = { info: 0, warn: 1, error: 2 };
const rawLevel = (process.env.LOG_LEVEL || 'info').toLowerCase();
const minLevel = Object.hasOwn(priority, rawLevel) ? rawLevel : 'info';
function log(level, msg) {
  if (priority[level] >= priority[minLevel]) console.log(`[${level.toUpperCase()}] ${msg}`);
}
module.exports = {
  info: (msg) => log('info', msg),
  warn: (msg) => log('warn', msg),
  error: (msg) => log('error', msg),
  get initCount() { return initCount; },
};
