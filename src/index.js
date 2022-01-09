import parser from './parsers.js';
import formatter from './formatters/index.js';
import buildAST from './buildAST.js';
import { getDataFromFile, getFormat } from './getData.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = parser(getDataFromFile(filepath1), getFormat(filepath1));
  const data2 = parser(getDataFromFile(filepath2), getFormat(filepath2));
  const result = buildAST(data1, data2);
  const diff = formatter(result, format);

  return diff;
};

export default genDiff;
