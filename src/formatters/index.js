import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatter = (data, outputFormat) => {
  switch (outputFormat) {
    case 'stylish':
      return stylish(data);
    case 'json':
      return json(data);
    case 'plain':
      return plain(data);
    default:
      throw new Error(`Формат не поддерживается: ${outputFormat}`);
  }
};

export default formatter;
