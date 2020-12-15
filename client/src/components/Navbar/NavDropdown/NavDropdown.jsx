import React from 'react';
import classes from './NavDropdown.module.css';

const NavDropdown = ({ isOpen }) => {
  const isOpenClassname = isOpen ? classes['dropdown--open'] : '';
  return <div className={`${classes.dropdown} ${isOpenClassname}`}></div>;
};

export default NavDropdown;
