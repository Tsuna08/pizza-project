import classes from './Menu.module.scss'

import { Header, Search } from '@/components'

interface MenuProps {}

export const Menu = ({}: MenuProps) => {
  return (
    <>
      <div className={classes.header}>
        <Header>Menu</Header>
        <Search placeholder='Введите блюдо или состав' />
      </div>
    </>
  )
}
