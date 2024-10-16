import cn from 'classnames';
import { ButtonHTMLAttributes, ReactNode } from 'react';

import classes from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: 'large' | 'small';
}

export const Button = ({ children, size = 'small', className, type, onClick }: ButtonProps) => (
  <button
    type={type}
    className={cn(classes.button, classes.accent, className, {
      [classes.large]: size === 'large',
      [classes.small]: size === 'small'
    })}
    onClick={onClick}
  >
    {children}
  </button>
);
