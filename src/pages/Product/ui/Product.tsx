import { useDispatch } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';

import { Box, Button, Header, Price, Rating } from '@/components';
import { routers } from '@/routers';
import { cartActions } from '@/store/cart.slice';
import { AppDispatch } from '@/store/store';
import { Product as ProductType } from '@/types/products';

import classes from './Product.module.scss';

export const Product = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const data = useLoaderData() as ProductType;

  const handleAdd = () => {
    dispatch(cartActions.add(data.id));
    navigate(routers.cart);
  };

  return (
    <>
      <section className={classes.header}>
        <Header>{data.name}</Header>
        <Button className={classes.buttonIcon} onClick={handleAdd}>
          <img src='/bucket.svg' alt='Добавить в корзину' />
          Добавить в корзину
        </Button>
      </section>
      <section className={classes.section}>
        <img src={data.image} alt='Пицца' className={classes.image} />
        <section className={classes.description}>
          <Box>
            <h4>Цена</h4>
            <Price price={data.price} />
          </Box>
          <Box>
            <h4>Рейтинг</h4>
            <Rating rating={data.rating} />
          </Box>
          <div>
            <h4>Состав:</h4>
            <Box className={classes.ingredients}>
              {data.ingredients.map((item, index) => (
                <div key={index}>{item}</div>
              ))}
            </Box>
          </div>
        </section>
      </section>
    </>
  );
};

export default Product;
