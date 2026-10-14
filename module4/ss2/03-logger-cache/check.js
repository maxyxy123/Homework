const app1 = require('./app1');
const app2 = require('./app2');
const app3 = require('./app3');
const logger1 = app1();
const logger2 = app2();
const logger3 = app3();
console.log('Cùng một object:', logger1 === logger2 && logger2 === logger3);
console.log('initCount cuối cùng:', logger1.initCount);
