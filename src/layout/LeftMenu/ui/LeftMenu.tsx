import cn from 'classnames';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import { Button } from '@/components';
import { routers } from '@/routers';
import { AppDispatch, RootState } from '@/store/store';
import { getUserProfile, userActions } from '@/store/user.slice';

import classes from './LeftMenu.module.scss';

export const LeftMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const userProfile = useSelector((state: RootState) => state.user.profile);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  const logout = () => {
    dispatch(userActions.logout());
    navigate(`${routers.auth}/${routers.login}`);
  };

  return (
    <nav className={classes.navBar}>
      <section className={classes.user}>
        <img src='/avatar.svg' alt='avatar' />
        <p className={classes.name}>{userProfile?.name}</p>
        <p className={classes.email}>{userProfile?.email}</p>
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
        Корзина {cartItems.length > 0 && <div className={classes.counter}>{cartItems.length}</div>}
      </NavLink>

      <Button className={classes.exit} onClick={logout}>
        <img src='/turn-off.svg' alt='turn-off-icon' />
        Выход
      </Button>
    </nav>
  );
};
