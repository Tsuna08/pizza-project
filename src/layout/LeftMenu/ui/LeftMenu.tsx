import { Button } from '@/components'
import cn from 'classnames'
import { NavLink } from 'react-router-dom'
import classes from './LeftMenu.module.scss'

interface LeftMenuProps {}

export const LeftMenu = ({}: LeftMenuProps) => {
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
        Menu
      </NavLink>
      <NavLink
        to='/cart'
        className={({ isActive }) => cn(classes.link, { [classes.active]: isActive })}
      >
        <img src='/cart.svg' alt='cart-icon' />
        Card
      </NavLink>

      <Button className={classes.exit}>
        <img src='/turn-off.svg' alt='turn-off-icon' />
        Выход
      </Button>
    </nav>
  )
}
