import React from 'react';
import PropTypes from 'prop-types';

import './text.scss';

const fontSize = {
  large: 'large',
  larger: 'larger',
  medium: 'medium',
  small: 'small',
  smaller: 'smaller',
  'x-large': 'x-large',
  'x-small': 'x-small',
  'xx-large': 'xx-large',
  'xx-small': 'xx-small',
};

function Text({ children, size = fontSize.medium }) {
  console.log('Text -> size', size);
  //generer clasname base sur size (xs,s,xxxl,....)
  const className = fontSize[size] ? `wh-font-size-${size}` : '';

  return (
    <div>
      <p className={className} style={{ color: 'font-color-green' }}>
        {children}
      </p>
    </div>
  );
}

export default Text;

Text.propTypes = {
  children: PropTypes.string,
  size: PropTypes.oneOf(Object.values(fontSize)),
};
