import { Outlet } from 'react-router-dom';

import classes from './AuthLayout.module.scss';

export const AuthLayout = () => {
  return (
    <section className={classes.layout}>
      <section className={classes.logo}>
        <img src='/logo.png' alt='Логотип' />
      </section>
      <section className={classes.form}>
        <Outlet />
      </section>
    </section>
  );
};
