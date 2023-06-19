import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({
  role, isChecked, onCheckBoxChange, styles,
}) => {
  const checkBoxHandler = () => onCheckBoxChange();
  return (
    <input
      role={role}
      type="checkbox"
      checked={isChecked}
      onChange={checkBoxHandler}
      className={styles}
    />
  );
};

export default Checkbox;

Checkbox.propTypes = {
  role: PropTypes.string,
  styles: PropTypes.string,
  isChecked: PropTypes.bool,
  onCheckBoxChange: PropTypes.func,
};
