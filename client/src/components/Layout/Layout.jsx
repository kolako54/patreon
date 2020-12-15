import React from 'react';
import Navbar from '../Navbar/Navbar';
import classes from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <main className={classes.container}>
      <Navbar />
      {children}
    </main>
  );
};

export default Layout;
