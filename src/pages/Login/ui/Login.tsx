import { Link } from 'react-router-dom';

import { Button, Header, Input } from '@/components';

import classes from './Login.module.scss';

export const Login = () => {
  return (
    <>
      <Header>Вход</Header>
      <form className={classes.form}>
        <section className={classes.field}>
          <label htmlFor='email'>Email</label>
          <Input id='email' placeholder='Введите email' placeholder='Введите email' />
        </section>
        <section className={classes.field}>
          <label htmlFor='password'>Пароль</label>
          <Input id='password' type='password' placeholder='Введите пароль' />
        </section>
        <Button size='large'>Вход</Button>
        <section className={classes.register}>
          <span>Нет аккаунта?</span>
          <Link to='/auth/register'>Зарегистрироваться</Link>
        </section>
      </form>
    </>
  );
};

export default Login;
