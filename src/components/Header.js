import React from "react";
import classes from "./Header.module.css";
import logo from '../logo.png';

export const Header = () => {
  return (
    <header className={classes["todo-image"]}>
      <img src={logo} alt="Logo"  className='App-logo'/>
    </header>
  );
};
