import Footer from '../Footer';
import Header from '../Header';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout(props: LayoutProps) {
  const {
    children,
  } = props;

  return (
    <main>
      <Header />
      {children}
      <Footer />
    </main>
  );
}
