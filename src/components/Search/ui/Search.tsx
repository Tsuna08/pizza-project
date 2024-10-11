import cn from 'classnames'
import { ForwardedRef, forwardRef, InputHTMLAttributes } from 'react'

import classes from './Search.module.scss'

export const Search = forwardRef(
  (
    { value, placeholder, className, onChange }: InputHTMLAttributes<HTMLInputElement>,
    ref?: ForwardedRef<HTMLInputElement> | null
  ) => (
    <div className={classes.wrapper}>
      <img src='/search.svg' alt='Поиск' className={classes.icon} />
      <input
        ref={ref}
        type='text'
        value={value}
        placeholder={placeholder}
        className={cn(classes.input, className)}
        onChange={onChange}
      />
    </div>
  )
)
