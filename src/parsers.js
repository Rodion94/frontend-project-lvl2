import yaml from 'js-yaml';

const parser = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
      return yaml.load(data);
    default:
      return new Error(`Wrong input format: '${format}'`);
  }
};

export default parser;
