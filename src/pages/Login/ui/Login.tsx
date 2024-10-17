import { yupResolver } from '@hookform/resolvers/yup';
import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { Button, Header, Input } from '@/components';
import { PREFIX } from '@/helpers/api';
import { routers } from '@/routers';

import { defaultValuesSurvey, LoginForms, prepareFormValues, schemaNewSurvey } from '../lib/utils';
import classes from './Login.module.scss';

export const Login = () => {
  const [error, setError] = useState('');

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginForms>({
    defaultValues: defaultValuesSurvey,
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(schemaNewSurvey)
  });

  const onSubmit: SubmitHandler<LoginForms> = async (date) => {
    prepareFormValues(date);
    await axios
      .post(`${PREFIX}/auth/login`, { ...prepareFormValues(date) })
      .then((response) => console.log('response: ', response))
      .catch((error) => {
        if (error instanceof AxiosError) {
          setError(error.response?.data?.message);
        }
      });
  };

  const [emailField, passwordField] = watch(['email', 'password']);

  useEffect(() => {
    if (emailField || passwordField) {
      setError('');
    }
  }, [emailField, passwordField]);

  return (
    <>
      <Header>Вход</Header>
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

        {error && <span className={classes.errorMessage}>{error}</span>}
        <Button type='submit' size='large'>
          Вход
        </Button>

        <section className={classes.register}>
          <span>Нет аккаунта?</span>
          <Link to={`${routers.auth}/${routers.register}`} className={classes.link}>
            Зарегистрироваться
          </Link>
        </section>
      </form>
    </>
  );
};

export default Login;
