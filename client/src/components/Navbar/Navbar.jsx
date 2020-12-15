import React, { useState } from 'react';
import classes from './Navbar.module.css';
import Navitem from './Navitem/Navitem';
import MainLogo from '../../assets/icons/mainLogo.png';
import NavDropdown from './NavDropdown/NavDropdown';

const Navbar = () => {
  const [navs, setNavs] = useState([
    { name: 'سازندگان', items: ['پادکست ها', 'فلان'] },
    { name: 'منابع', items: ['پادکست ها۲', 'فلان'] },
    { name: 'قیمت گذاری', items: ['پادکست ها۳', 'فلان'] },
    { name: 'محصول', items: ['پادکست ها۴', 'فلان'] },
  ]);
  const [openNavName, setOpenNavName] = useState('سازندگان');
  return (
    <nav className={classes.navbar}>
      <img className={classes['nav-logo']} src={MainLogo} alt="MainLogo" />
      <div className={classes['nav-items']}>
        {navs.map(({ name, items }) => {
          const isOpen = name === openNavName;
          return (
            <Navitem key={name} isOpen={isOpen}>
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
