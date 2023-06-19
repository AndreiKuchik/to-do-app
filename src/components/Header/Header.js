import React from 'react';
import classes from './Header.module.css';
import logo from '../../resources/logo.png';

const Header = () => (
  <header className={classes['todo-image']}>
    <img src={logo} alt="Logo" className="App-logo" />
  </header>
);

export default Header;
