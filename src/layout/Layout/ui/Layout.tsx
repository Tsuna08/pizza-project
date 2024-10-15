import { LeftMenu } from '@/layout/LeftMenu';
import { Outlet } from 'react-router-dom';

import classes from './Layout.module.scss';

export const Layout = () => {
  return (
    <div className={classes.layout}>
      <LeftMenu />
      <main className={classes.content}>
        <Outlet />
      </main>
    </div>
  );
};
