import React, {useRef, useState} from 'react';
import { useForm } from 'react-hook-form';
import mainLogo from '../../assets/icons/mainLogo.png';
import googleIcon from '../../assets/icons/googleIcon.png';
import Button from '../../components/Button/Button';
import classes from './Register.module.css';
import Input from '../../components/Input/Input';
import GlowingText from '../../components/GlowingText/GlowingText';
import { useMutation } from '@apollo/client';
import {REGISTER} from '../../queries/queries'



const Register = () => {
  const { register, handleSubmit, errors, watch } = useForm();
  const password = useRef({});
  password.current = watch("password", "");
  const [signUp] = useMutation(REGISTER);
  const [someError, setSomeError] = useState('');
  const onSubmit = async (data) => {
    try {
       await signUp({
        variables: {
          name: data.name,
          email: data.email,
          password: data.password,
          confirmPassword: data.passwordConfirmation
        }
      })
    } catch (err) { 
      setSomeError(err.message);
    }
  };
  return (
    <div className={classes.register__container}>
      <div className={classes.register}>
        <div className={classes.register__heading}>
          <h1>ثبت نام</h1>
          <span></span>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={classes.register__form}
        >
          <img src={mainLogo} alt="" className={classes.register__icon} />
          <Input
            label="نام"
            type="text"
            name="name"
            error={errors.name}
            ref={register({
              required: { value: true, message: 'این قسمت نباید خالی باشد' },
            })}
          />
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
          <Input
            label="تکرار رمز عبور"
            type="password"
            error={errors.passwordConfirmation}
            name="passwordConfirmation"
            ref={register({
              validate: value =>
                value === password.current || "پسوردها مطابقت ندارند",
              required: { value: true, message: 'این قسمت نباید خالی باشد' },
            })}
          />
          <Button classname={classes.register__btn}>ثبت نام</Button>
        </form>
        <button className={classes.register__OAuth}>
          <img
            src={googleIcon}
            className={classes.googleIcon}
            alt="googleIcon"
          />
          <p>ثبت نام با گوگل</p>
        </button>
        <section className={classes.register__login}>
        <p style={{color: 'tomato'}}>{someError}</p> 
        <div>
          از قبل اکانت دارید؟
          <a href="/login">
            <GlowingText glowOnHover={true}> ورود </GlowingText>
          </a>
          </div>
        </section>   
      </div>
    </div>
  );
};

export default Register;
