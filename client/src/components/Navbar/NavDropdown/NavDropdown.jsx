import React from 'react';
import classes from './NavDropdown.module.css';

const NavDropdown = ({ isOpen, items }) => {
  const isHidden = !isOpen;
  const isHiddenClassname = isHidden ? classes['dropdown--hidden'] : '';
  return (
    <div className={`${classes.dropdown} ${isHiddenClassname}`}>
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
