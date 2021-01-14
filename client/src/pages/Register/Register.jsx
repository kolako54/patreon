import React from 'react';
import { useForm } from 'react-hook-form';
import mainLogo from '../../assets/icons/mainLogo.png';
import Button from '../../components/Button/Button';
import classes from './Register.module.css';
import Input from '../../Input/Input';
const Register = () => {
  const { register, handleSubmit, errors } = useForm();
  console.log(errors);
  const onSubmit = (data) => alert(JSON.stringify(data));
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
              required: { value: true, message: 'این قسمت نباید خالی باشد' },
            })}
          />
          <Button classname={classes.register__btn}>ثبت نام</Button>
        </form>
        <section className={classes.register__OAuth}></section>
        <section className={classes.register__login}></section>
      </div>
    </div>
  );
};

export default Register;
