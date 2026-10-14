import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const dirname = path.dirname(fileURLToPath(import.meta.url));
const settings = JSON.parse(readFileSync(new URL('./config.json', import.meta.url), 'utf8'));
console.log('Dir:', dirname);
console.log('JSON orders:', settings.sampleOrderCount);
