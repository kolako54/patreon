import React from 'react';
import classes from './Input.module.css';

const Input = React.forwardRef(
  ({ name, label, type = 'text', error = {} }, ref) => {
    if (error) {
      console.log(error);
    }
    return (
      <div className={classes['input-container']}>
        <label htmlFor={name} className={classes.label}>
          <p>{label}</p>
          {error.message ? (
            <p className={classes.error}>{error.message}</p>
          ) : null}
        </label>
        <input
          type={type}
          ref={ref}
          name={name}
          id={name}
          spellCheck="false"
          className={classes.input}
        />
      </div>
    );
  }
);

export default Input;
