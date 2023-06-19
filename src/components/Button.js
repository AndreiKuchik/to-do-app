import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  buttonClass, buttonType, buttonName, isDisabled,
}) => (
  <button className={buttonClass} type={buttonType} disabled={isDisabled}>
    {buttonName}
  </button>
);

export default Button;

Button.propTypes = {
  buttonClass: PropTypes.string,
  buttonType: PropTypes.string,
  buttonName: PropTypes.string,
  isDisabled: PropTypes.bool,
};
