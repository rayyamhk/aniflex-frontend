import Image from 'next/image';
import useStyle from '../../../hooks/useStyles';
import Link from '../../atoms/Link';
import TextField from '../../atoms/TextField';
import SearchBar from '../SearchBar';
import styles from './header.module.css';

export default function Header() {
  const css = useStyle(styles);
  return (
    <header className={css('wrapper')}>
      <div className={css('responsive', 'container')}>
        <Link className={css('logo')} href={{ pathname: '/' }}>
          <Image
            src='/favicon.ico'
            alt='Site logo'
            width={32}
            height={32}
          />
        </Link>
        <SearchBar />
      </div>
    </header>
  );
}