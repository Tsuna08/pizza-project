import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import { Button } from '@/components';
import { routers } from '@/routers';
import { AppDispatch } from '@/store/store';
import { userActions } from '@/store/user.slice';

import classes from './LeftMenu.module.scss';

export const LeftMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const logout = () => {
    dispatch(userActions.logout());
    navigate(`${routers.auth}/${routers.login}`);
  };

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

      <Button className={classes.exit} onClick={logout}>
        <img src='/turn-off.svg' alt='turn-off-icon' />
        Выход
      </Button>
    </nav>
  );
};
