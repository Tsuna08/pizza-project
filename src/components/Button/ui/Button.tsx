import { ButtonHTMLAttributes } from 'react';
import cn from 'classnames';
import classes from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  size: 'large' | 'small';
}

export const Button = ({ text, size = 'small', onClick }: ButtonProps) => (
  <button
    onClick={onClick}
    className={cn(classes.button, classes.accent, {
      [classes.large]: size === 'large',
      [classes.small]: size === 'small'
    })}
  >
    {text}
  </button>
);
