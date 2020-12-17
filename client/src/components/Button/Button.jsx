import React from 'react';
import classes from './Button.module.css';

const Button = ({ children, classname, ...props }) => {
  return (
    <button {...props} className={`${classes.button} ${classname}`}>
      {children}
    </button>
  );
};

export default Button;
