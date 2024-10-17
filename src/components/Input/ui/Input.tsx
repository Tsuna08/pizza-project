import cn from 'classnames';
import { ForwardedRef, forwardRef, InputHTMLAttributes } from 'react';

import classes from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: object;
}

export const Input = forwardRef((data: InputProps, ref?: ForwardedRef<HTMLInputElement> | null) => (
  <input
    {...data}
    ref={ref}
    className={cn(classes.input, data.className, { [classes.error]: data.error })}
  />
));
