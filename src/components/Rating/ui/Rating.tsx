import classes from './Rating.module.scss';

interface RatingProps {
  rating: number;
}

export const Rating = ({ rating }: RatingProps) => {
  return (
    <div className={classes.rating}>
      {rating} <img src='/star.svg' alt='Звезда' height='15px' />
    </div>
  );
};
