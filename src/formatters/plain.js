import _ from 'lodash';

const stringify = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }

  return _.isString(value) ? `'${value}'` : value;
};

const render = (nodes) => {

  const renderNested = (node, currentKey) => {
    const {
      children,
    } = node;
    return children.map((child) => iter(child, `${currentKey}.`)).join('');
  };
  
  const renderChanged = (node, currentKey) => {
    const {
      oldValue, newValue,
    } = node;
    return `Property '${currentKey}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)}\n`;
  };

  const renderAdded = (node, currentKey) => {
    const {
      newValue,
    } = node;
    return `Property '${currentKey}' was added with value: ${stringify(newValue)}\n`;
  };

  const renderRemoved = (currentKey) => {
    return `Property '${currentKey}' was removed\n`;
  };

  const iter = (node, nameKey) => {
    const {
      key, type,
    } = node;

    const currentKey = `${nameKey}${key}`;
    switch (type) {
      case 'nested':
        return renderNested(node, currentKey);
      case 'unchanged':
        return '';
      case 'changed':
        return renderChanged(node, currentKey);
      case 'added':
        return renderAdded(node, currentKey);
      case 'removed':
        return renderRemoved(currentKey);
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