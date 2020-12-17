import React from 'react';
import classes from './Landing.module.css';
import dummyVideoPlaceholder from '../../assets/images/dummy/dummyVideoPlaceholder.png';
import Button from '../../components/Button/Button';

const Landing = () => {
  return (
    <div className={classes.landing}>
      <section className={classes['top-content']}>
        <div className={classes.left}>
          <figure className={classes['dummy-video-image']}>
            <img src={dummyVideoPlaceholder} alt="dummyVideoPlaceholder" />
          </figure>
        </div>
        <div className={classes.right}>
          <div className={classes.board}>
            <p>راه ارزش گذاری هنر را تغییر بده و کسب درامد کن!</p>
          </div>
          <Button>شروع کن</Button>
        </div>
      </section>
      <section className={classes['middle-content']}></section>
      <footer className={classes['footer']}></footer>
    </div>
  );
};

export default Landing;
