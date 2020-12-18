import React from 'react';
import classes from './SearchInput.module.css';

const SearchInput = ({ value, setValue }) => {
  return (
    <div className={classes.searh}>
      <input
        type="text"
        name="srach"
        value={value}
        className={classes['search-input']}
      />
      <i className={classes['search-icon']}></i>
    </div>
  );
};

export default SearchInput;
