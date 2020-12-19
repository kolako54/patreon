import React from 'react';
import classes from './SearchInput.module.css';
import searchIcon from '../../assets/icons/search.png';

const SearchInput = ({ value, setValue, ...props }) => {
  return (
    <div className={classes.searh}>
      <input
        {...props}
        type="text"
        name="search"
        spellCheck={false}
        value={value}
        className={classes['search-input']}
      />
      <img
        src={searchIcon}
        alt="searchIcon"
        className={classes['search-icon']}
      />
    </div>
  );
};

export default SearchInput;
