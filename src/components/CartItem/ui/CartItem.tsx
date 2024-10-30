import { MouseEvent } from 'react';

import classes from './CartItem.module.scss';

interface CartItemProps {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  rating: number;
  onClick: () => void;
  onAdd: (event: MouseEvent<HTMLImageElement | MouseEvent>, id: number) => void;
}

export const CartItem = ({
  id,
  price,
  rating,
  title,
  description,
  image,
  onClick,
  onAdd
}: CartItemProps) => {
  return (
    <section className={classes.card} onClick={onClick}>
      <div className={classes.image} style={{ backgroundImage: `url('${image}')` }}>
        <div className={classes.price}>
          {price} <span className={classes.currency}>₽</span>
        </div>
        <button className={classes.addButton}>
          <img src='/bucket.svg' alt='Добавить в корзину' onClick={(event) => onAdd(event, id)} />
        </button>
        <div>
          <div className={classes.rating}>
            {rating} <img src='/star.svg' alt='Звезда' height='15px' />
          </div>
        </div>
      </div>

      <article className={classes.descriptionBlock}>
        <div className={classes.title}>{title}</div>
        <div className={classes.description}>{description}</div>
      </article>
    </section>
  );
};
