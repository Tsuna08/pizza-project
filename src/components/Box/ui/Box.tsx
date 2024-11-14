import { ReactNode } from 'react';

interface BoxProps {
  children: ReactNode;
  className?: string;
}

export const Box = (props: BoxProps) => {
  return (
    <div
      style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}
      className={props?.className}
    >
      {props.children}
    </div>
  );
};
