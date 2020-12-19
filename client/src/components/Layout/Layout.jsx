import React from 'react';
import Navbar from '../Navbar/Navbar';
import classes from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className={classes.container}>{children}</main>
    </>
  );
};

export default Layout;
