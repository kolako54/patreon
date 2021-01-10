import React from 'react';
import classes from './Landing.module.css';
import dummyVideoPlaceholder from '../../assets/images/dummy/dummyVideoPlaceholder.png';
import Button from '../../components/Button/Button';
import SearchInput from '../../components/SearchInput/SearchInput';
import ImportantPart from '../../components/ImportantPart/ImportantPart';
import comments from '../../data/dummy/comments';
import Comment from './Comment/Comment';
import PaginationSwiper from '../../components/PaginationSwiper/PaginationSwiper';
import Offer from './Offer/Offer';
import OfferItems from './Offer/OfferItems';
import OfferItem from './Offer/OfferItem';
import offers from '../../data/dummy/offers';

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
            <p>!راه ارزش گذاری هنر را تغییر بده و کسب درامد کن</p>
          </div>
          <Button classname={classes['board__btn']}>شروع کن</Button>
        </div>
      </section>
      <section className={classes['middle-content']}>
        <h1 className={classes['middle-content__heading']}>
          میان <ImportantPart>یک میلیون </ImportantPart>
          نفر پاترئونی جستجو کنید
        </h1>
        <form>
          <div className={classes['search-bar']}>
            <SearchInput placeholder="گیتاریست..." />

            <div className={classes['search-btn']}>
              <Button>جستجو</Button>
            </div>
          </div>
        </form>
        <div className={classes['about-patreon']}>
          <h1 className={classes['about-patreon__heading']}>پاترئون چیست</h1>
          <p className={classes['about-patreon__text']}>
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
            استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز،
            و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای
            زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و
            متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان
            رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد
            کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه
            راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل
            حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود
            طراحی اساسا مورد استفاده قرار گیرد.
            <i className={classes['pseudo-element']} />
          </p>
        </div>
        <div className={classes.comments}>
          {comments.map((comment, index) => (
            <Comment
              key={comment.title}
              comment={comment}
              isRtl={index % 2 === 0}
            />
          ))}
        </div>
        <div className={classes['patreon-usage']}>
          <h1 className={classes['patreon-usage__title']}>
            چه کسانی از پاترئون استفاده کنن؟
          </h1>
          <p className={classes['patreon-usage__body']}>
            <p>
              .اگر میخواهی بدونی این سایت مناسب کیاست فقط کافیه به
              <ImportantPart> آیکن</ImportantPart> های سایت نگاه کنی
            </p>

            <p>درسته! فرقی نمیکنه از چه صنفی وارد پاترئون میشوی یا شغلت چیه</p>

            <p>
              تو میتونی با یاددادن مهارتی که داری کابر جذب کنی و کسب دارمد کنی
            </p>

            <p>
              <ImportantPart>!به همین راحتی</ImportantPart>
            </p>
          </p>
        </div>
        <PaginationSwiper />
        <div className={classes.payment}>
          <h1 className={classes['payment__title']}>
            آسون تر از چیزی که فکرشو میکنی
          </h1>
          <section className={classes['payment__body']}>
            <section className={classes['payment__explanation']}>
              <p>روش های مختلفی برای امتیاز گرفتن از ظرفدارات وجود داره </p>
              <p>تو میتونی امتیاز خودتو همونطوری که میخوای دریافت کنی</p>
              <p>
                مثال زیر رو مثلا برای یک
                <ImportantPart> گیتاریست </ImportantPart>
                میزنیم
              </p>
            </section>
            <div className={classes['payment__samples']}>
              {offers.map(({ price, items, starsCount }) => (
                <Offer
                  key={`${price}${starsCount}`}
                  price={price}
                  starsCount={starsCount}
                >
                  <OfferItems>
                    {items.map((item) => (
                      <OfferItem key={item}>{item}</OfferItem>
                    ))}
                  </OfferItems>
                  <Button classname={classes['payment__btn']}>عضویت</Button>
                </Offer>
              ))}
            </div>
          </section>
        </div>
        <section className={classes['join-now']}>
          <h1 className={classes['join-now__heading']}>
            آماده ای برای اینکه عضو بشی
          </h1>
          <Button classname={classes['join-now__btn']}>شروع کن</Button>
        </section>
      </section>
      <footer className={classes['footer']}></footer>
    </div>
  );
};

export default Landing;
