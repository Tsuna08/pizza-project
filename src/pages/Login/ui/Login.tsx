import { FormEvent } from 'react';
import { Link } from 'react-router-dom';

import { Button, Header, Input } from '@/components';

import classes from './Login.module.scss';

export const Login = () => {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log('event: ', event);
  };

  // const sendLogin = (email: string, password: string) => {};

  return (
    <>
      <Header>Вход</Header>
      <form className={classes.form} onSubmit={handleSubmit}>
        <section className={classes.field}>
          <label htmlFor='email'>Email</label>
          <Input id='email' name='email' placeholder='Введите email' />
        </section>
        <section className={classes.field}>
          <label htmlFor='password'>Пароль</label>
          <Input id='password' name='password' type='password' placeholder='Введите пароль' />
        </section>
        <Button type='submit' size='large'>
          Вход
        </Button>
        <section className={classes.register}>
          <span>Нет аккаунта?</span>
          <Link to='/auth/register' className={classes.link}>
            Зарегистрироваться
          </Link>
        </section>
      </form>
    </>
  );
};

export default Login;
