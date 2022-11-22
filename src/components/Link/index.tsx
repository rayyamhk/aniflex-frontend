import React from 'react';
import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';

type ModifiedNextLinkProps = {
  to: NextLinkProps['href'],
} & Omit<NextLinkProps, 'href'>

const ModifiedNextLink = React.forwardRef<HTMLAnchorElement, ModifiedNextLinkProps>(({ to, ...rest }: ModifiedNextLinkProps, ref) => (
  <NextLink href={to} ref={ref} {...rest} />
));

type LinkProps = Omit<MuiLinkProps, 'href'> & Pick<NextLinkProps, 'href'>;

export default function Link(props: LinkProps) {
  const {
    href,
    ...rest
  } = props;

  return (
    <MuiLink
      component={ModifiedNextLink}
      to={href}
      {...rest}
    />
  );
}