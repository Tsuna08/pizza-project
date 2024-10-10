import cn from 'classnames'
import { HTMLAttributes, ReactNode } from 'react'
import classes from './Header.module.scss'

interface HeaderProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
}

export const Header = ({ children, className }: HeaderProps) => (
  <h1 className={cn(classes.h1, className)}>{children}</h1>
)
