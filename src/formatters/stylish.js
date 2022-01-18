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

const renderIter = (node, depth = 1) => {
  const renderFunc = renderFuncs[node.type];
  if(typeof renderFunc === 'undefined') {
    throw new Error(`unexpected type ${node.type}`);
  }
  return renderFunc(node, depth);   
}; 

const renderFuncs = {
  nested:(node, depth) => {
  return `\n${getIndent(depth)}  ${node.key}: {${node.children.map((child) => renderIter(child, depth + 1)).join('')}\n${getIndent(depth)}  }`;
  },
  unchanged:(node, depth) => {
  return `\n${getIndent(depth)}  ${node.key}: ${stringify(node.oldValue, depth + 1)}`;
  },
  changed:(node, depth) => {
  return `\n${getIndent(depth)}- ${node.key}: ${stringify(node.oldValue, depth + 1)}\n${getIndent(depth)}+ ${node.key}: ${stringify(node.newValue, depth + 1)}`;
  },
  added:(node, depth) => {
  return `\n${getIndent(depth)}+ ${node.key}: ${stringify(node.newValue, depth + 1)}`;
  },
  removed:(node, depth) => {
   return `\n${getIndent(depth)}- ${node.key}: ${stringify(node.oldValue, depth + 1)}`;
  },
};

const render = (nodes) => {
  return renderIter(nodes);
};

const stylish = (nodes) => {
  const lines = nodes.map((node) => render(node));
  return `{${lines.join('')}\n}`;
};

export default stylish;
