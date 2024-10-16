import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';

import { Card, Header, Loader, Search } from '@/components';
import { PREFIX } from '@/helpers/api';
import { routers } from '@/routers';
import { Product } from '@/types/products';

import classes from './Menu.module.scss';

export const Menu = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getMenu = async () =>
    axios
      .get(`${PREFIX}/products`)
      .then((response) => setProducts(response.data))
      .catch((error) => {
        console.error(error);

        if (error instanceof AxiosError) {
          setError(error.message);
        }
        setLoading(false);
        return;
      })
      .finally(() => setLoading(false));

  useEffect(() => {
    setLoading(true);
    getMenu();
  }, []);

  return (
    <>
      <section className={classes.header}>
        <Header>Меню</Header>
        <Search placeholder='Введите блюдо или состав' />
      </section>
      {error && <p>{error}</p>}
      {isLoading ? (
        <Loader />
      ) : (
        <section className={classes.cardList}>
          {products.map((item) => (
            <Card
              key={item.id}
              title={item.name}
              description={item.ingredients.join(', ')}
              price={item.price}
              rating={item.rating}
              image={item.image}
              onClick={() => navigate(generatePath(routers.product, { id: item.id }))}
            />
          ))}
        </section>
      )}
    </>
  );
};

export default Menu;
