import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CartItem, Header, Loader } from '@/components';
import { PREFIX } from '@/helpers/api';
import { cartActions } from '@/store/cart.slice';
import { AppDispatch, RootState } from '@/store/store';
import { Product } from '@/types/products';

import classes from './Cart.module.scss';

export const Cart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getItem = useCallback(async (id: number) => {
    const { data } = await axios.get(`${PREFIX}/products/${id}`);
    return data;
  }, []);

  const loadAllCartItems = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const products = await Promise.all(cartItems.map((item) => getItem(item.id)));
      setCartProducts(products.filter((product): product is Product => !!product));
    } catch (err) {
      setError('Ошибка загрузки товаров корзины');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [cartItems, getItem]);

  useEffect(() => {
    loadAllCartItems();
  }, []);

  const handleClick = () => {};
  const handleRemove = (id: number) => dispatch(cartActions.remove(id));
  const handleAdd = (id: number) => dispatch(cartActions.add(id));
  const handleDelete = (id: number) => dispatch(cartActions.delete(id));

  return (
    <>
      <Header>Корзина</Header>
      {error && <p>{error}</p>}
      {isLoading ? (
        <Loader />
      ) : (
        <section className={classes.cardList}>
          {cartItems.length === 0 ? (
            <p>Корзина пуста</p>
          ) : (
            <>
              {cartItems.map((item) => {
                const product = cartProducts.find((card) => card.id === item.id);
                if (!product) return;

                return (
                  <CartItem
                    key={product.id}
                    count={item.count}
                    {...product}
                    onClick={handleClick}
                    onRemove={handleRemove}
                    onAdd={handleAdd}
                    onDelete={handleDelete}
                  />
                );
              })}
            </>
          )}
        </section>
      )}
    </>
  );
};

export default Cart;
