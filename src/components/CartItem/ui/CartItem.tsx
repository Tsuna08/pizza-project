import classes from './CartItem.module.scss';

interface CartItemProps {
  id: number;
  name: string;
  image: string;
  price: number;
  count: number;
  onClick: (id: number) => void;
  onRemove: (id: number) => void;
  onAdd: (id: number) => void;
  onDelete: (id: number) => void;
}

export const CartItem = ({
  id,
  name,
  image,
  price,
  count,
  onClick,
  onRemove,
  onAdd,
  onDelete
}: CartItemProps) => {
  return (
    <section className={classes.item} key={id}>
      <div
        className={classes.image}
        style={{ backgroundImage: `url('${image}')` }}
        onClick={() => onClick(id)}
      />
      <article className={classes.description} onClick={() => onClick(id)}>
        <div className={classes.name}>{name}</div>
        <div className={classes.price}>
          {price} <span className={classes.currency}>₽</span>
        </div>
      </article>
      <article className={classes.actions}>
        <button className={classes.button} onClick={() => onRemove(id)}>
          <img src='/minus.svg' alt='Удалить из корзины' height='20px' />
        </button>
        <span>{count}</span>
        <button className={classes.button} onClick={() => onAdd(id)}>
          <img src='/plus.svg' alt='Добавить в корзину' height='20px' />
        </button>
        <button className={classes.button} onClick={() => onDelete(id)}>
          <img src='/cross.svg' alt='Удалить всё' height='10px' />
        </button>
      </article>
    </section>
  );
};
