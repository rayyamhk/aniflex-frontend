import { useRouter } from "next/router";
import React, { useState } from "react";
import { MdSearch } from "react-icons/md";
import useStyle from "../../../hooks/useStyles";
import Button from "../../atoms/Button";
import TextField from "../../atoms/TextField";
import styles from './searchBar.module.css';

export default function SearchBar() {
  const css = useStyle(styles);
  const router = useRouter();
  const [text, setText] = useState('');

  const onClick = () => {
    if (text.length > 0) router.push(`/search?q=${text}`);
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  };
  return (
    <div className={css('container')}>
      <TextField
        className={css('search-bar')}
        onChange={onChange}
        placeholder={'搜尋'}
        value={text}
      />
      <Button
        onClick={onClick}
        className={css('btn')}
      >
        <MdSearch className={css('icon')}/>
      </Button>
    </div>
  )
}