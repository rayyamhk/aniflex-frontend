import React from "react";
import useStyle from "../../../hooks/useStyles"
import styles from './button.module.css';

type ButtonProps = {
  className?: string,
  children: React.ReactNode,
  onClick?: () => void,
}

export default function Button(props: ButtonProps) {
  const {
    className,
    children,
    onClick = () => {},
  } = props;

  const css = useStyle(styles);
  return (
    <button
      className={css('btn', className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}