import { ReactNode } from 'react';
import Link from '../Link';
import useStyle from '../../../hooks/useStyles';
import styles from './chip.module.css';

type ChipProps = {
  children: ReactNode;
  className?: string;
  path: string;
};

export default function Chip({ className, children, path }: ChipProps) {
  const css = useStyle(styles);
  return (
    <Link
      className={css('wrapper', className)}
      href={{
        pathname: path,
      }}
    >
      {children}
    </Link>
  );
}