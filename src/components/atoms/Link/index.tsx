import React from 'react';
import NextLink from 'next/link';
import useStyle from '../../../hooks/useStyles';
import styles from './link.module.css';

type LinkProps = {
  hover?: boolean,
} & React.ComponentProps<typeof NextLink>;

export default function Link({ className, children, hover = false, ...rest }: LinkProps) {
  const css = useStyle(styles);
  return (
    <NextLink
      className={css(className, hover && 'hover', 'link')}
      {...rest}
    >
      {children}
    </NextLink>
  );
}
