import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton, TextFieldProps } from '@mui/material';
import EyeClosedIcon from '../../icons/EyeClosedIcon';
import EyeOpenIcon from '../../icons/EyeOpenIcon';

const PasswordInput = (props: TextFieldProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <TextField
      {...props}
      type={isPasswordVisible ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton size="small" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
              {isPasswordVisible ? <EyeOpenIcon /> : <EyeClosedIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordInput;
