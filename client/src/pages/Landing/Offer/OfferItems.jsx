import React from 'react';
import classes from './OfferItems.module.css';

const OfferItems = ({ children }) => {
  return <ul className={classes['offer-items']}>{children}</ul>;
};

export default OfferItems;
