import _ from 'lodash';

const stringify = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }

  return _.isString(value) ? `'${value}'` : value;
};

const render = (nodes) => {
  const iter = (node, nameKey) => {
    const {
      key, type, children, oldValue, newValue,
    } = node;

    const currentKey = `${nameKey}${key}`;
    switch (type) {
      case 'nested':
        return children.map((child) => iter(child, `${currentKey}.`)).join('');
      case 'unchanged':
        return '';
      case 'changed':
        return `Property '${currentKey}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)}\n`;
      case 'added':
        return `Property '${currentKey}' was added with value: ${stringify(newValue)}\n`;
      case 'removed':
        return `Property '${currentKey}' was removed\n`;
      default:
        throw new Error(`unexpected type ${type}`);
    }
  };

  return iter(nodes, '');
};

const plain = (nodes) => {
  const lines = nodes.map((node) => render(node));
  return lines.join('').trim();
};

export default plain;