import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Button, CartItem, Header, Loader } from '@/components';
import { PREFIX } from '@/helpers/api';
import { DELIVERY_PRICE } from '@/helpers/constants';
import { routers } from '@/routers';
import { cartActions } from '@/store/cart.slice';
import { AppDispatch, RootState } from '@/store/store';
import { Product } from '@/types/products';

import classes from './Cart.module.scss';

export const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const jwt = useSelector((state: RootState) => state.user.jwt);

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
  const handleOrder = async () => {
    setLoading(true);
    await axios
      .post(
        `${PREFIX}/order`,
        { products: cartItems },
        { headers: { Authorization: `Bearer ${jwt}` } }
      )
      .then(() => {
        dispatch(cartActions.clean());
        navigate(routers.successOrder);
      })
      .finally(() => setLoading(false));
  };

  const total = cartItems
    .map((item) => {
      const product = cartProducts.find((card) => card.id === item.id);
      if (!product) return 0;
      return item.count * product.price;
    })
    .reduce((value, index) => (value += index), 0);

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

              <section className={classes.total}>
                <div className={classes.price}>
                  <h4>Итог</h4>
                  <p>{total} ₽</p>
                </div>
                <div className={classes.price}>
                  <h4>Доставка</h4>
                  <p>{DELIVERY_PRICE} ₽</p>
                </div>
                <div className={classes.price}>
                  <h4>К оплате</h4>
                  <p>{total + DELIVERY_PRICE} ₽</p>
                </div>
              </section>
              <section className={classes.total}>
                <Button type='submit' onClick={handleOrder}>
                  Заказать
                </Button>
              </section>
            </>
          )}
        </section>
      )}
    </>
  );
};

export default Cart;
