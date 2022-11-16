import useStyle from '../../../hooks/useStyles';
import styles from './textfield.module.css';

type TextFieldProps = {
  className?: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  placeholder?: string,
  value: string,
}

export default function TextField(props: TextFieldProps) {
  const {
    className,
    onChange = () => {},
    placeholder,
    value,
  } = props;

  const css = useStyle(styles);
  return (
    <input
      className={css('input', className)}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
    />
  );
}