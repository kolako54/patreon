import React, { useEffect, useRef, useState } from 'react';

import classes from './Navbar.module.css';

import Navitem from './Navitem/Navitem';
import MainLogo from '../../assets/icons/mainLogo.png';
import NavDropdown from './NavDropdown/NavDropdown';

import navItems from '../../data/navItems';

const Navbar = () => {
  const [openNavName, setOpenNavName] = useState('');
  const navItemsEl = useRef(null);
  useEffect(() => {
    document.addEventListener('mousedown', (e) => {
      const isClickInsideNav = navItemsEl.current.contains(e.target);
      if (!isClickInsideNav) {
        setOpenNavName('');
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const navItemClickHandler = (event, name) => {
    setOpenNavName(name);
  };
  return (
    <nav className={classes.navbar}>
      <img className={classes['nav-logo']} src={MainLogo} alt="MainLogo" />
      <div className={classes['nav-items']} ref={navItemsEl}>
        {navItems.map(({ name, items }, index) => {
          const isFirstNav = index === 0;
          const isOpen = name === openNavName;
          return (
            <Navitem
              key={name}
              isOpen={isOpen}
              onClick={(e) => navItemClickHandler(e, name)}
            >
              <p>{name}</p>
              <NavDropdown
                items={items}
                isOpen={isOpen}
                className={isFirstNav ? classes['first-nav'] : ''}
              />
            </Navitem>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
