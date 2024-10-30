import axios, { AxiosError } from 'axios';
import { MouseEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { generatePath, useNavigate } from 'react-router-dom';

import { Card, Header, Loader, Search } from '@/components';
import { PREFIX } from '@/helpers/api';
import { routers } from '@/routers';
import { cartActions } from '@/store/cart.slice';
import { AppDispatch } from '@/store/store';
import { Product } from '@/types/products';

import classes from './Menu.module.scss';

export const Menu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    setLoading(true);
    getMenu(filter);
  }, [filter]);

  const debouncedSearch = useCallback((value: string) => {
    const handler = setTimeout(() => setFilter(value), 500);

    return () => clearTimeout(handler);
  }, []);

  const getMenu = async (name: string) => {
    axios
      .get(`${PREFIX}/products`, { params: { name } })
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
  };

  const handleAdd = (event: MouseEvent<HTMLImageElement | MouseEvent>, id: number) => {
    event.stopPropagation();
    dispatch(cartActions.add(id));
  };

  return (
    <>
      <section className={classes.header}>
        <Header>Меню</Header>
        <Search
          placeholder='Введите блюдо или состав'
          onChange={(event) => debouncedSearch(event?.target.value)}
        />
      </section>
      {error && <p>{error}</p>}
      {isLoading ? (
        <Loader />
      ) : (
        <section className={classes.cardList}>
          {products.length > 0 ? (
            products.map((item) => (
              <Card
                key={item.id}
                id={item.id}
                title={item.name}
                description={item.ingredients.join(', ')}
                price={item.price}
                rating={item.rating}
                image={item.image}
                onClick={() => navigate(generatePath(routers.product, { id: item.id }))}
                onAdd={handleAdd}
              />
            ))
          ) : (
            <p>Не найдено</p>
          )}
        </section>
      )}
    </>
  );
};

export default Menu;
