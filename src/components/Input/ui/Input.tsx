import cn from 'classnames'
import { ForwardedRef, forwardRef, InputHTMLAttributes } from 'react'

import classes from './Input.module.scss'

export const Input = forwardRef(
  (
    {
      id,
      type = 'text',
      value,
      placeholder,
      className,
      onChange
    }: InputHTMLAttributes<HTMLInputElement>,
    ref?: ForwardedRef<HTMLInputElement> | null
  ) => (
    <input
      ref={ref}
      id={id}
      type={type}
      value={value}
      placeholder={placeholder}
      className={cn(classes.input, className)}
      onChange={onChange}
    />
  )
)
