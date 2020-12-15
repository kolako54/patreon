import React from 'react';
import classes from './Backface.module.css';

const Backface = ({ children, isShown, onClick }) => {
  return isShown ? (
    <div className={classes.backface} onClick={onClick}>
      {children}
    </div>
  ) : null;
};

export default Backface;
