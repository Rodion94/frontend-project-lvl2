import yml from 'js-yml';

const parsersTree = {
  json: JSON.parse,
  yml: yml.load,
};

export default (data, dataType) => {
  const parse = parsersTree[dataType];
  return parse(data);
};
