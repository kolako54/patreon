import React from 'react';
import classes from './Landing.module.css';
import dummyVideoPlaceholder from '../../assets/images/dummy/dummyVideoPlaceholder.png';
import Button from '../../components/Button/Button';
import SearchInput from '../../components/SearchInput/SearchInput';
import ImportantPart from '../../components/ImportantPart/ImportantPart';

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
          <Button classname={classes['board_btn']}>شروع کن</Button>
        </div>
      </section>
      <section className={classes['middle-content']}>
        <h1 className={classes['middle-content__heading']}>
          میان <ImportantPart>یک میلیون </ImportantPart>
          نفر پاترئونی جستجو کنید
        </h1>
        <form>
          <div className={classes['search-bar']}>
            <SearchInput></SearchInput>

            <div className={classes['search-btn']}>
              <Button>جستجو</Button>
            </div>
          </div>
        </form>
        <div className={classes['about-patreon']}>
          <h1 className={classes['about-patreon__heading']}>پاترئون چیست</h1>
          <p>
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
            استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز،
            و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای
            زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و
            متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان
            رایانه ای
          </p>
        </div>
      </section>
      <footer className={classes['footer']}></footer>
    </div>
  );
};

export default Landing;
