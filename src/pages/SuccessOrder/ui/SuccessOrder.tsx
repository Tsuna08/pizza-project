import { useNavigate } from 'react-router-dom';

import { Button } from '@/components';
import { routers } from '@/routers';

import classes from './SuccessOrder.module.scss';

export const SuccessOrder = () => {
  const navigate = useNavigate();
  return (
    <section className={classes.success}>
      <img src='/pizza.jpg' alt='Пицца' height='350px' />
      <h3 className={classes.title}>Ваш заказ успешно оформлен</h3>
      <Button onClick={() => navigate(routers.root)}>Сделать новый </Button>
    </section>
  );
};

export default SuccessOrder;
