const express = require('express');
const { performance } = require('node:perf_hooks');
const { sequelize, Category, Product } = require('./models');
require('dotenv').config();
const app = express();
// Logging theo từng request: truyền callback riêng qua options của mọi truy vấn.
function metricMiddleware(req, res, next) {
 req.queryCount = 0;
 req.sqlLogger = () => { req.queryCount += 1; };
 req.startMs = performance.now();
 next();
}
app.use('/api/v1/report', metricMiddleware);
function sendReport(req, res, data) {
 res.json({ success: true, data, meta: { queryCount: req.queryCount, durationMs: Math.round((performance.now() - req.startMs) * 100) / 100 } });
}
app.get('/api/v1/report/slow', async (req, res) => {
 try {
  const categories = await Category.findAll({ order: [['id','ASC']], logging: req.sqlLogger });
  const data = [];
  for (const category of categories) {
   const products = await Product.findAll({ where: {categoryId:category.id}, order: [['id','ASC']], logging: req.sqlLogger });
   data.push({ ...category.toJSON(), Products: products.map(p => p.toJSON()) });
  }
  sendReport(req,res,data);
 } catch(e) { console.error(e);res.status(500).json({success:false,error:'Database error'}); }
});
app.get('/api/v1/report/fast', async (req, res) => {
 try {
  const rows = await Category.findAll({
   include: [{model:Product}], order: [['id','ASC'],[Product,'id','ASC']], logging: req.sqlLogger,
  });
  sendReport(req,res,rows.map(c=>c.toJSON()));
 } catch(e) { console.error(e);res.status(500).json({success:false,error:'Database error'}); }
});
(async()=>{await sequelize.authenticate();app.listen(process.env.PORT||3000,()=>console.log('Listening'))})().catch(e=>{console.error(e);process.exit(1)});
