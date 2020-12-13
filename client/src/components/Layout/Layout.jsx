import React from 'react';
import classes from './Layout.module.css';

const Layout = ({ children }) => {
  return <main className={classes.container}>{children}</main>;
};

export default Layout;
