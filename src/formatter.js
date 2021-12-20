import { readFileSync } from 'fs';
import path from 'path';

const formatter = (filepath) => {
  const jsonFs = readFileSync(path.resolve(filepath), 'utf-8');
  const jsonParse = JSON.parse(jsonFs);
  return jsonParse;
};

export default formatter;