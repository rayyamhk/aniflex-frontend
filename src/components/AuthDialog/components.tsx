import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';

type InputFieldProps = {
  autoFocus?: boolean,
  label: string,
  value: string,
  placeholder?: string,
  helperText?: string,
  type: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
};

type CheckboxFieldProps = {
  checked: boolean,
  label: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
};

export function InputField({ autoFocus, label, placeholder, helperText, type, value, onChange }: InputFieldProps) {
  return (
    <TextField
      autoFocus={autoFocus}
      fullWidth
      required
      variant='outlined'
      color='primary'
      label={label}
      placeholder={placeholder}
      helperText={helperText}
      margin='normal'
      type={type}
      value={value}
      onChange={onChange}
    />
  );
}

export function RememberMeCheckbox({ checked, label, onChange }: CheckboxFieldProps) {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={onChange}
        />
      }
      label={label}
      sx={{
        '.MuiFormControlLabel-label': {
          fontSize: 'body2.fontSize'
        }
      }}
    />
  );
}