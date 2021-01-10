import React from 'react';
import classes from './Offer.module.css';
import star from '../../../assets/icons/star.png';
import range from 'lodash/range';

const Offer = ({ starsCount, price, children }) => {
  const stars = range(starsCount);
  return (
    <div className={classes.offer}>
      <div className={classes.stars}>
        {stars.map((_, index) => (
          <img key={index} src={star} alt="star" className={classes.star} />
        ))}
      </div>
      <div className={classes.price}>
        <p>{price}</p>
      </div>
      {children}
    </div>
  );
};

export default Offer;
