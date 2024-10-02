import { Outlet } from 'react-router-dom'

import { LeftMenu } from '@/layout/LeftMenu'

import classes from './Layout.module.scss'


interface LayoutProps {}

export const Layout = ({}: LayoutProps) => {
  return (
    <>
      <LeftMenu />
      <main>
        <Outlet />
      </main>
    </>
  )
}
