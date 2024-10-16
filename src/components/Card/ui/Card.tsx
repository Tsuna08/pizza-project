import classes from './Card.module.scss';

interface CardProps {
  title: string;
  description: string;
  image: string;
  price: number;
  rating: number;
  onClick: () => void;
}

export const Card = ({ price, rating, title, description, image, onClick }: CardProps) => {
  return (
    <section className={classes.card} onClick={onClick}>
      <div className={classes.image} style={{ backgroundImage: `url('${image}')` }}>
        <div className={classes.price}>
          {price} <span className={classes.currency}>₽</span>
        </div>
        <button className={classes.addButton}>
          <img src='/bucket.svg' alt='Добавить в корзину' />
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
