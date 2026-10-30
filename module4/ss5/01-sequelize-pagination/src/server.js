const express = require('express');
const { Op } = require('sequelize');
const sequelize = require('./db');
const Product = require('./product');
const app = express();
function parsePositiveInteger(value, fallback) {
  if (value === undefined) return fallback;
  if (typeof value !== 'string' || !/^[0-9]+$/.test(value)) return null;
  const number = Number(value);
  return Number.isSafeInteger(number) && number > 0 ? number : null;
}
app.get('/api/v1/products', async (req, res) => {
  const page = parsePositiveInteger(req.query.page, 1);
  const limit = parsePositiveInteger(req.query.limit, 10);
  if (page === null || limit === null || limit > 50) {
    return res.status(400).json({ success: false, error: 'page phải > 0 và limit phải từ 1 đến 50' });
  }
  const keyword = typeof req.query.keyword === 'string' ? req.query.keyword.trim() : '';
  if (req.query.keyword !== undefined && typeof req.query.keyword !== 'string') {
    return res.status(400).json({ success: false, error: 'keyword không hợp lệ' });
  }
  const sorts = { price_asc: [['price', 'ASC'], ['id', 'DESC']], price_desc: [['price', 'DESC'], ['id', 'DESC']], id_desc: [['id', 'DESC']] };
  const sort = req.query.sort === undefined ? 'id_desc' : req.query.sort;
  if (typeof sort !== 'string' || !Object.hasOwn(sorts, sort)) {
    return res.status(400).json({ success: false, error: 'sort không hợp lệ' });
  }
  // Escape ký tự wildcard để keyword được tìm như chuỗi nhập vào.
  const escaped = keyword.replace(/[%_]/g, char => String.fromCharCode(92) + char);
  try {
    const { rows, count } = await Product.findAndCountAll({
      where: keyword ? { name: { [Op.like]: `%${escaped}%` } } : {},
      order: sorts[sort], offset: (page - 1) * limit, limit,
    });
    res.json({ success: true, data: rows, meta: { page, limit, total: count, totalPages: Math.ceil(count / limit) } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Database error' });
  }
});
(async () => { await sequelize.authenticate(); app.listen(process.env.PORT || 3000, () => console.log('Listening on', process.env.PORT || 3000)); })().catch(err => { console.error(err); process.exit(1); });
