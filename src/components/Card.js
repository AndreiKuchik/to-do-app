import React from 'react';
import PropTypes from 'prop-types';
import classes from './Card.module.css';

const Card = (props) => (
    <div className={`${classes.card} ${props.className}`}>{props.children}</div>
);

Card.propTypes = {
  className: PropTypes.any,
  children: PropTypes.any,
};

export default Card;
