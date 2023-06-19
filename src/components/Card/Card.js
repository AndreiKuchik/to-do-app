import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Card.module.css';

const Card = (props) => (
  <div className={classNames(styles.card, props.className)}>
    {props.children}
  </div>
);

Card.propTypes = {
  className: PropTypes.any,
  children: PropTypes.any,
};

export default Card;
