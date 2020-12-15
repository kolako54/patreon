import React, { useState } from 'react';

import classes from './Navbar.module.css';

import Navitem from './Navitem/Navitem';
import MainLogo from '../../assets/icons/mainLogo.png';
import NavDropdown from './NavDropdown/NavDropdown';

import navItems from './navItems';

const Navbar = () => {
  const [openNavName, setOpenNavName] = useState('');
  const navItemClickHandler = (event, name) => {
    setOpenNavName(name);
  };
  return (
    <nav className={classes.navbar}>
      <img className={classes['nav-logo']} src={MainLogo} alt="MainLogo" />
      <div className={classes['nav-items']}>
        {navItems.map(({ name, items }) => {
          const isOpen = name === openNavName;
          return (
            <Navitem
              key={name}
              isOpen={isOpen}
              onClick={(e) => navItemClickHandler(e, name)}
            >
              <p>{name}</p>
              <NavDropdown items={items} isOpen={isOpen} />
            </Navitem>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
