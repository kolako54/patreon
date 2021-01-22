import React from 'react';
import { useForm } from 'react-hook-form';
import mainLogo from '../../assets/icons/mainLogo.png';
import googleIcon from '../../assets/icons/googleIcon.png';
import Button from '../../components/Button/Button';
import classes from './Login.module.css';
import Input from '../../components/Input/Input';
import GlowingText from '../../components/GlowingText/GlowingText';

const Login = () => {
  const { register, handleSubmit, errors } = useForm();
  console.log(errors);
  const onSubmit = (data) => alert(JSON.stringify(data));
  return (
    <div className={classes.login__container}>
      <div className={classes.login}>
        <div className={classes.login__heading}>
          <h1>ورود</h1>
          <span></span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.login__form}>
          <img src={mainLogo} alt="" className={classes.login__icon} />
          <Input
            label="ایمیل"
            type="email"
            name="email"
            error={errors.email}
            ref={register({
              required: { value: true, message: 'این قسمت نباید خالی باشد' },
            })}
          />
          <Input
            label="رمز عبور"
            type="password"
            name="password"
            error={errors.password}
            ref={register({
              required: { value: true, message: 'این قسمت نباید خالی باشد' },
            })}
          />
          <Button classname={classes.login__btn}>ورود</Button>
        </form>
        <button className={classes.login__OAuth}>
          <img
            src={googleIcon}
            className={classes.googleIcon}
            alt="googleIcon"
          />
          <p>ورود با گوگل</p>
        </button>
        <section className={classes.login__login}>
          هنوز ثبت نام نکرده اید؟
          <a href="/register">
            <GlowingText glowOnHover={true}> ثبت نام </GlowingText>
          </a>
        </section>
      </div>
    </div>
  );
};

export default Login;
