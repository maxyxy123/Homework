function versionResolver(req, res) {
  const apiVersion = req.headers['api-version'] || 'v1';
  if (!['v1', 'v2'].includes(apiVersion)) {
    sendJson(res, 400, { success: false, code: 'UNSUPPORTED_API_VERSION', message: 'API version khong duoc ho tro' });
    return null;
  }
  req.apiVersion = apiVersion;
  if (apiVersion === 'v1') {
    res.setHeader('Deprecation', 'true');
    res.setHeader('Sunset', 'Wed, 31 Dec 2025 23:59:59 GMT');
  }
  return apiVersion;
}
const { sendJson } = require('../utils/http');
module.exports = versionResolver;
