import { ReactNode } from 'react';
import useStyle from '../../../hooks/useStyles';
import Footer from '../../molecules/Footer';
import Header from '../../molecules/Header';
import styles from './layout.module.css';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout(props: LayoutProps) {
  const {
    children,
  } = props;

  const css = useStyle(styles);

  return (
    <main className={css('container')}>
      <Header />
      {children}
      <Footer />
    </main>
  );
}
