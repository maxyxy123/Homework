import 'dotenv/config';
const delay = Number(process.env.PROCESSING_DELAY_MS ?? 2000);
if (!Number.isFinite(delay) || delay < 0) throw new Error('PROCESSING_DELAY_MS phải là số >= 0');
const config = {
  PROCESSING_DELAY_MS: delay,
  LOG_TIMEZONE: process.env.LOG_TIMEZONE || 'UTC',
};
new Intl.DateTimeFormat('en-US', { timeZone: config.LOG_TIMEZONE });
export default config;
