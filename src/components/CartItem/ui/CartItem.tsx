import classes from './CartItem.module.scss';

interface CartItemProps {
  id: number;
  name: string;
  image: string;
  price: number;
  count: number;
  onClick?: () => void;
  onAdd?: () => void;
  onRemove?: () => void;
}

export const CartItem = ({
  id,
  name,
  image,
  price,
  count,
  onClick,
  onAdd,
  onRemove
}: CartItemProps) => {
  return (
    <section className={classes.item} onClick={onClick} key={id}>
      <div className={classes.image} style={{ backgroundImage: `url('${image}')` }} />
      <article className={classes.description}>
        <div className={classes.name}>{name}</div>
        <div className={classes.price}>
          {price} <span className={classes.currency}>₽</span>
        </div>
      </article>
      <article className={classes.actions}>
        <button className={classes.button} onClick={onRemove}>
          <img src='/bucket.svg' alt='Добавить в корзину' height='15px' />
        </button>
        <span>{count}</span>
        <button className={classes.button} onClick={onAdd}>
          <img src='/star.svg' alt='Удалить из корзины' height='15px' />
        </button>
        <button className={classes.button} onClick={onRemove}>
          <img src='/star.svg' alt='Удалить всё' height='15px' />
        </button>
      </article>
    </section>
  );
};
