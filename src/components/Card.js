import React from "react";
// import PropTypes from "prop-types";
import classes from "./Card.module.css";

export const Card = (props) => {
  return (
    <div className={`${classes.card} ${props.className}`}>{props.children}</div>
  );
};