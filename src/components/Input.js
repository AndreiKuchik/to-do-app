import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ text, onTextChange }) => {
  const changeTextHandler = (e) => onTextChange(e.target.value);

  return (
    <input
      className="todo-input"
      type="text"
      value={text}
      onChange={changeTextHandler}
      placeholder="Please type your Text"
    />
  );
};

export default Input;

Input.propTypes = {
  text: PropTypes.string,
  onTextChange: PropTypes.func,
};
