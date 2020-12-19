import React from 'react';
import classes from './NavDropdown.module.css';

const NavDropdown = ({ isOpen, items, className }) => {
  const isHidden = !isOpen;
  const isHiddenClassname = isHidden ? classes['dropdown--hidden'] : '';
  return (
    <div className={`${classes.dropdown} ${isHiddenClassname} ${className}`}>
      {items.map((item) => {
        return (
          <section key={item} className={classes['drpodown-item']}>
            {item}
          </section>
        );
      })}
    </div>
  );
};

export default NavDropdown;
