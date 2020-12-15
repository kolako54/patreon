import React from 'react';
import classes from './Navitem.module.css';

const Navitem = ({ children, isOpen }) => {
  const isOpenClassname = isOpen ? classes['nav-item--open'] : '';

  return (
    <div className={`${classes['nav-item']} ${isOpenClassname}`}>
      {children}
    </div>
  );
};

export default Navitem;
