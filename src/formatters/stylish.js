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

const renderFuncs = {
  nested:(node, depth) => {
    const {
      key, children
    } = node;
  return `\n${getIndent(depth)}  ${key}: {${children.map((child) => renderIter(child, depth + 1)).join('')}\n${getIndent(depth)}  }`;
  },
  unchanged:(node, depth) => {
     const {
      key, oldValue
    } = node;
  return `\n${getIndent(depth)}  ${key}: ${stringify(oldValue, depth + 1)}`;
  },
  changed:(node, depth) => {
      const {
      key, oldValue, newValue
    } = node;
  return `\n${getIndent(depth)}- ${key}: ${stringify(oldValue, depth + 1)}\n${getIndent(depth)}+ ${key}: ${stringify(newValue, depth + 1)}`;
  },
  added:(node, depth) => {
     const {
      key, newValue
    } = node;
  return `\n${getIndent(depth)}+ ${key}: ${stringify(newValue, depth + 1)}`;
  },
  removed:(node, depth) => {
      const {
      key, oldValue
    } = node;
   return `\n${getIndent(depth)}- ${key}: ${stringify(oldValue, depth + 1)}`;
  },
};

const renderIter = (node, depth = 1) => {
  const {
    type,
  } = node;
  const renderFunc = renderFuncs[type];
  if(typeof renderFunc === 'undefined') {
    throw new Error(`unexpected type ${type}`);
  }
  return renderFunc(node, depth);   
}; 

const render = (nodes) => {
  return renderIter(nodes);
};

const stylish = (nodes) => {
  const lines = nodes.map((node) => render(node));
  return `{${lines.join('')}\n}`;
};

export default stylish;
