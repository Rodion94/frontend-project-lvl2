import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatter = (data, outputFormat = 'stylish') => {
  switch (outputFormat) {
    case 'json':
      return json(data);
    case 'plain':
      return plain(data);
    default:
      return stylish(data);
  }
};

export default formatter;