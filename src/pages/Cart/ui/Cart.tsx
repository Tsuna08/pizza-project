import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { CartItem, Header } from '@/components';
import { PREFIX } from '@/helpers/api';
import { RootState } from '@/store/store';
import { Product } from '@/types/products';

import classes from './Cart.module.scss';

export const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [cartProducts, setCartProducts] = useState<Product[]>([]);

  const getItem = async (id: number) => {
    const { data } = await axios.get(`${PREFIX}/products/${id}`);
    return data;
  };

  const loadAllCartItems = async () => {
    const response = await Promise.all(cartItems.map((item) => getItem(item.id)));
    setCartProducts(response);
  };

  useEffect(() => {
    loadAllCartItems();
  }, [cartItems]);

  return (
    <section>
      <Header>Корзина</Header>
      <section className={classes.cardList}>
        {cartItems.map((item) => {
          const product = cartProducts.find((card) => card.id === item.id);
          if (!product) return;

          return <CartItem count={item.count} {...product} />;
        })}
      </section>
    </section>
  );
};

export default Cart;
