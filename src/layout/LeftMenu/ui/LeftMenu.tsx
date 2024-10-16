import cn from 'classnames';
import { NavLink } from 'react-router-dom';

import { Button } from '@/components';

import classes from './LeftMenu.module.scss';

export const LeftMenu = () => {
  return (
    <nav className={classes.navBar}>
      <section className={classes.user}>
        <img src='/avatar.svg' alt='avatar' />
        <p className={classes.name}>Тестов Тест</p>
        <p className={classes.email}>test@test.com</p>
      </section>

      <NavLink
        to='/'
        className={({ isActive }) => cn(classes.link, { [classes.active]: isActive })}
      >
        <img src='/menu.svg' alt='menu-icon' />
        Меню
      </NavLink>
      <NavLink
        to='/cart'
        className={({ isActive }) => cn(classes.link, { [classes.active]: isActive })}
      >
        <img src='/cart.svg' alt='cart-icon' />
        Корзина
      </NavLink>

      <Button className={classes.exit}>
        <img src='/turn-off.svg' alt='turn-off-icon' />
        Выход
      </Button>
    </nav>
  );
};
