import useStyle from '../../../hooks/useStyles';
import styles from './footer.module.css';

export default function Footer() {
  const css = useStyle(styles);
  return (
    <footer className={css('wrapper')}>
      <div className={css('responsive', 'container')}>
        <span>Copyright ©{new Date().getFullYear()} Aniflex All rights reserved</span>
      </div>
    </footer>
  );
}