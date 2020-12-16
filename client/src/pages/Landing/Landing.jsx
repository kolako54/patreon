import React from 'react';
import classes from './Landing.module.css';
import dummyVideoPlaceholder from '../../assets/dummy/dummyVideoPlaceholder.png';

const Landing = () => {
  return (
    <div className={classes.landing}>
      <section className={classes['landing__top-content']}>
        <div className={classes['dummy-video-image']}>
          <img src={dummyVideoPlaceholder} alt="dummyVideoPlaceholder" />
        </div>
      </section>
      <section className={classes['landing__middle-content']}></section>
      <footer className={classes['landing__footer']}></footer>
    </div>
  );
};

export default Landing;
