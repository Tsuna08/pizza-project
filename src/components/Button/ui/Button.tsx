import cn from 'classnames'
import { ButtonHTMLAttributes, ReactNode } from 'react'
import classes from './Button.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  size?: 'large' | 'small'
}

export const Button = ({ children, size = 'small', className, onClick }: ButtonProps) => (
  <button
    onClick={onClick}
    className={cn(classes.button, classes.accent, className, {
      [classes.large]: size === 'large',
      [classes.small]: size === 'small'
    })}
  >
    {children}
  </button>
)
