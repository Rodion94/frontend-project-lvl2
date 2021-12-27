import path from 'path';
import fs from 'fs';

export const getDataFromFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  return fs.readFileSync(absolutePath, 'utf-8');
};

export const getFormat = (filepath) => path.extname(filepath).slice(1);