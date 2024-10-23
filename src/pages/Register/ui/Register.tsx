import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { Button, Header, Input } from '@/components';
import { routers } from '@/routers';
import { AppDispatch, RootState } from '@/store/store';
import { register as registerUser, userActions } from '@/store/user.slice';

import {
  defaultValuesSurvey,
  prepareFormValues,
  RegisterForms,
  schemaNewSurvey
} from '../lib/utils';
import classes from './Register.module.scss';

export const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { jwt, registerErrorMessage } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (jwt) navigate(routers.root);
  }, [jwt, navigate]);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterForms>({
    defaultValues: defaultValuesSurvey,
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(schemaNewSurvey)
  });

  const onSubmit: SubmitHandler<RegisterForms> = async (date) => {
    dispatch(userActions.clearLoginMessage());
    dispatch(registerUser(prepareFormValues(date)));
  };

  const [emailField, passwordField, nameField] = watch(['email', 'password', 'name']);

  useEffect(() => {
    if (emailField || passwordField || nameField) {
      dispatch(userActions.clearLoginMessage());
    }
  }, [emailField, passwordField, nameField, dispatch]);

  return (
    <>
      <Header>Регистрация</Header>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <section className={classes.field}>
          <label htmlFor='email'>Email</label>
          <Input
            id='email'
            placeholder='Введите email'
            error={errors.email}
            {...register('email')}
          />
          {errors.email?.message && (
            <span className={classes.errorMessage}>{errors.email?.message}</span>
          )}
        </section>

        <section className={classes.field}>
          <label htmlFor='password'>Пароль</label>
          <Input
            id='password'
            type='password'
            placeholder='Введите пароль'
            error={errors.password}
            {...register('password')}
          />
          {errors.password?.message && (
            <span className={classes.errorMessage}>{errors.password?.message}</span>
          )}
        </section>

        <section className={classes.field}>
          <label htmlFor='name'>Имя</label>
          <Input id='name' placeholder='Введите имя' error={errors.name} {...register('name')} />
          {errors.password?.message && (
            <span className={classes.errorMessage}>{errors.password?.message}</span>
          )}
        </section>

        {registerErrorMessage && (
          <span className={classes.errorMessage}>{registerErrorMessage}</span>
        )}
        <Button type='submit' size='large'>
          Зарегистрироваться
        </Button>

        <section className={classes.register}>
          <span>Есть аккаунт?</span>
          <Link to={`${routers.auth}/${routers.login}`} className={classes.link}>
            Войти
          </Link>
        </section>
      </form>
    </>
  );
};

export default Register;
