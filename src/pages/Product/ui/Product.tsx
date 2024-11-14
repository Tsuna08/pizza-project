import { useLoaderData } from 'react-router-dom';

import { Box, Header, Price, Rating } from '@/components';
import { Product as ProductType } from '@/types/products';

import classes from './Product.module.scss';

export const Product = () => {
  const data = useLoaderData() as ProductType;

  return (
    <>
      <Header>{data.name}</Header>
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
