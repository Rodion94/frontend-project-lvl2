import _ from 'lodash';

const stringify = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }

  return _.isString(value) ? `'${value}'` : value;
};

const renderIter = (node, nameKey) => {
  const currentKey = `${nameKey}${node.key}`;
  const renderFunc = renderFuncs[node.type];
  if(typeof renderFunc === 'undefined') {
    throw new Error(`unexpected type ${node.type}`);
  }
  return renderFunc(node, currentKey);   
}; 

const renderFuncs = {
  nested: (node, currentKey) => {
    return node.children.map((child) => renderIter(child, `${currentKey}.`)).join('');
  },
  
  // eslint-disable-next-line no-unused-vars
  unchanged:(_node, _currentKey) => {
    return '';
  },
  changed:(node, currentKey) => {
    return `Property '${currentKey}' was updated. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}\n`;
  },
  added:(node, currentKey) => {
    return `Property '${currentKey}' was added with value: ${stringify(node.newValue)}\n`;
  },
  removed:(_node, currentKey) => {
    return `Property '${currentKey}' was removed\n`;
  },
};

const render = (nodes) => {
  return renderIter(nodes, '');
};
  
const plain = (nodes) => {
  const lines = nodes.map((node) => render(node));
  return lines.join('').trim();
};

export default plain;