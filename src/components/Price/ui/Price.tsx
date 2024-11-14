import { Box } from '@/components/Box';

import classes from './Price.module.scss';

interface PriceProps {
  price: number;
}

export const Price = ({ price }: PriceProps) => {
  return (
    <Box className={classes.box}>
      <p className={classes.price}>{price}</p>
      <span className={classes.currency}>₽</span>
    </Box>
  );
};
