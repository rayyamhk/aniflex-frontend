import React from 'react';
import NextLink from 'next/link';
import useStyle from '../../../hooks/useStyles';
import styles from './link.module.css';

export default function Link({ className, children, ...rest }: React.ComponentProps<typeof NextLink>) {
  const css = useStyle(styles);
  return (
    <NextLink
      className={css(className, 'link')}
      {...rest}
    >
      {children}
    </NextLink>
  );
}
