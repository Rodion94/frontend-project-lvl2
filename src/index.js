import _ from 'lodash';

import formatter from './formatter.js';

const operators = ['-', '+'];

const getComprasion = (filepath1, filepath2) => {
  const json1 = formatter(filepath1);
  const json2 = formatter(filepath2);
  const keys1 = _.keys(json1);
  const keys2 = _.keys(json2);
  const keysAll = _.union(keys1, keys2);
  keysAll.sort();
  const result = {};
  for (let key of keysAll) {
    if (_.has(json1, key) && !_.has(json2, key)) {
      result[`${operators[0]} ${key}`] = json1[key];
    } else if (!_.has(json1, key) && _.has(json2, key)) {
      result[`${operators[1]} ${key}`] = json2[key];
    } else if (
      _.has(json1, key) &&
      _.has(json2, key) &&
      json1[key] === json2[key]
    ) {
      result[`  ${key}`] = json1[key];
    } else if (
      _.has(json1, key) &&
      _.has(json2, key) &&
      json1[key] !== json2[key]
    ) {
      result[`${operators[0]} ${key}`] = json1[key];
      result[`${operators[1]} ${key}`] = json2[key];
    }
  }
  const resultStringfy = JSON.stringify(result, null, 2);
  console.log(resultStringfy);
};

export default getComprasion;