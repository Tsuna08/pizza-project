import { MouseEvent } from 'react';

import { Rating } from '@/components/Rating';

import classes from './Card.module.scss';

interface CardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  rating: number;
  onClick: () => void;
  onAdd: (event: MouseEvent<HTMLImageElement | MouseEvent>, id: number) => void;
}

export const Card = ({
  id,
  price,
  rating,
  title,
  description,
  image,
  onClick,
  onAdd
}: CardProps) => {
  return (
    <section className={classes.card} onClick={onClick}>
      <div className={classes.image} style={{ backgroundImage: `url('${image}')` }}>
        <div className={classes.price}>
          {price} <span className={classes.currency}>₽</span>
        </div>
        <button className={classes.addButton}>
          <img src='/bucket.svg' alt='Добавить в корзину' onClick={(event) => onAdd(event, id)} />
        </button>
        <div className={classes.rating}>
          <Rating rating={rating} />
        </div>
      </div>

      <article className={classes.descriptionBlock}>
        <div className={classes.title}>{title}</div>
        <div className={classes.description}>{description}</div>
      </article>
    </section>
  );
};
