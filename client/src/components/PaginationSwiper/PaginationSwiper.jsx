import React from 'react';
import clasess from './styles.module.css';
import GuitarImage from '../../assets/images/guitar.jpeg';

const SliderC = () => {
  return (
    <img
      src={GuitarImage}
      alt="GuitarImage"
      className={clasess.paginationSwiper}
    />
  );
};

export default SliderC;
