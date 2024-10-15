import classes from './Loader.module.scss';

export const Loader = () => (
  <section className={classes.content}>
    <img className={classes.loader} src='/loader.svg' alt='Загрузка' />
  </section>
);
