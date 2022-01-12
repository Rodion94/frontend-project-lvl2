import _ from 'lodash';

const stringify = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }

  return _.isString(value) ? `'${value}'` : value;
};

const renderFuncs = {
  nested:(node, currentKey) => {
    const {
      children,
    } = node;
    return children.map((child) => renderIter(child, `${currentKey}.`)).join('');
  },
  
  // eslint-disable-next-line no-unused-vars
  unchanged:(_node, _currentKey) => {
    return '';
  },
  changed:(node, currentKey) => {
    const {
      oldValue, newValue,
    } = node;
    return `Property '${currentKey}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)}\n`;
  },
  added:(node, currentKey) => {
    const {
      newValue,
    } = node;
    return `Property '${currentKey}' was added with value: ${stringify(newValue)}\n`;
  },
  removed:(_node, currentKey) => {
    return `Property '${currentKey}' was removed\n`;
  },
};

const renderIter = (node, nameKey) => {
  const {
    key, type,
  } = node;

  const currentKey = `${nameKey}${key}`;
  const renderFunc = renderFuncs[type];
  if(typeof renderFunc === 'undefined') {
    throw new Error(`unexpected type ${type}`);
  }
  return renderFunc(node, currentKey);   
}; 


const render = (nodes) => {
  return renderIter(nodes, '');
};
  
const plain = (nodes) => {
  const lines = nodes.map((node) => render(node));
  return lines.join('').trim();
};

export default plain;