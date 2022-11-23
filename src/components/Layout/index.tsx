
import useTheme from '@mui/material/styles/useTheme';
import GlobalStyles from '@mui/material/GlobalStyles';
import Footer from '../Footer';
import Header from '../Header';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout(props: LayoutProps) {
  const {
    children,
  } = props;

  const theme = useTheme();

  return (
    <main>
      <GlobalStyles
        styles={{
          '::-webkit-scrollbar': {
            width: '7.5px',
          },
          '::-webkit-scrollbar-track': {
            backgroundColor: theme.palette.background.default,
          },
          '::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.action.focus,
            borderRadius: '999px',
          },
          '::-webkit-scrollbar-thumb:hover': {
            backgroundColor: theme.palette.action.disabled,
          }
        }}
      />
      <Header />
      {children}
      <Footer />
    </main>
  );
}
