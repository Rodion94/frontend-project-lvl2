import _ from 'lodash';

const getIndent = (depth, count = 4) => ' '.repeat(depth * count - 2);

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return `${value}`;
  }

  const result = Object.keys(value).map((key) => {
    const childValue = value[key];
    return `${getIndent(depth)}  ${key}: ${stringify(childValue, depth + 1)}\n`;
  });

  return `{\n${result.join('')}${getIndent(depth - 1)}  }`;
};

const render = (nodes) => {
  const iter = (node, depth = 1) => {
    switch (node.type) {
      case 'nested':
        return `\n${getIndent(depth)}  ${node.key}: {${node.children.map((child) => iter(child, depth + 1)).join('')}\n${getIndent(depth)}  }`;
      case 'unchanged':
        return `\n${getIndent(depth)}  ${node.key}: ${stringify(node.oldValue, depth + 1)}`;
      case 'changed':
        return `\n${getIndent(depth)}- ${node.key}: ${stringify(node.oldValue, depth + 1)}\n${getIndent(depth)}+ ${node.key}: ${stringify(node.newValue, depth + 1)}`;
      case 'added':
        return `\n${getIndent(depth)}+ ${node.key}: ${stringify(node.newValue, depth + 1)}`;
      case 'removed':
        return `\n${getIndent(depth)}- ${node.key}: ${stringify(node.oldValue, depth + 1)}`;
      default:
        throw new Error(`unexpected type ${node.type}`);
    }
  };

  return iter(nodes);
};

const stylish = (nodes) => {
  const lines = nodes.map((node) => render(node));
  return `{${lines.join('')}\n}`;
};

export default stylish;
