import React from 'react';
import classes from './Navitem.module.css';

const Navitem = ({ children, isOpen, onClick }) => {
  const isOpenClassname = isOpen ? classes['nav-item--open'] : '';

  return (
    <div
      className={`${classes['nav-item']} ${isOpenClassname}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Navitem;
