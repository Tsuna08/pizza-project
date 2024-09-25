import { ButtonHTMLAttributes } from 'react';

import classes from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export const Button = ({ text, onClick }: ButtonProps) => (
  <button onClick={onClick} className={`${classes.button} ${classes.accent}`}>
    {text}
  </button>
);
