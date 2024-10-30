import { useSelector } from 'react-redux';

import { CartItem, Header } from '@/components';
import { RootState } from '@/store/store';

// import classes from './Cart.module.scss';

interface CartProps {
  id: number;
  name: string;
  image: string;
  price: number;
  count: number;
}

export const Cart = (props: CartProps) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  console.log('cartItems: ', cartItems);

  return (
    <section>
      <Header>Корзина</Header>
      <CartItem {...props} />
    </section>
  );
};

export default Cart;
