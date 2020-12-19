import React from 'react';
import classes from './ImportantPart.module.css';

const ImportantPart = ({ children, className, ...props }) => {
  return (
    <span className={`${classes.important} ${className || ''}`}>
      {children}
    </span>
  );
};

export default ImportantPart;
