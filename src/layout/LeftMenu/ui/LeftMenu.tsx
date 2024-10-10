import { Button } from '@/components'
import { Link } from 'react-router-dom'
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

      <Link to='/' className={classes.link}>
        <img src='/menu.svg' alt='menu-icon' />
        Menu
      </Link>
      <Link to='/cart' className={classes.link}>
        <img src='/cart.svg' alt='cart-icon' />
        Card
      </Link>

      <Button className={classes.exit}>
        <img src='/turn-off.svg' alt='turn-off-icon' />
        Выход
      </Button>
    </nav>
  )
}
