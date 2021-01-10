import React from 'react';
import classes from './OfferItem.module.css';

const OfferItem = ({ children }) => {
  return <li className={classes['offer-item']}>{children}</li>;
};

export default OfferItem;
