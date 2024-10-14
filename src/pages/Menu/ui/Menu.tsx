import classes from './Menu.module.scss';

import { Card, Header, Search } from '@/components';

export const Menu = () => {
  return (
    <>
      <section className={classes.header}>
        <Header>Menu</Header>
        <Search placeholder='Введите блюдо или состав' />
      </section>
      <section>
        <Card
          id={1}
          title='Пицца'
          description='Состав'
          price={300}
          rating={4}
          image='/public/pizza.jpg'
        />
      </section>
    </>
  );
};
