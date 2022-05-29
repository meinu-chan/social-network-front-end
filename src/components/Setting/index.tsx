import { Box, Typography, colors, Input, FormHelperText, FormControl } from '@mui/material';
import React from 'react';
import MuiPhoneNumber from 'material-ui-phone-number';
interface IProps {
  fieldName: string;
  isPhone?: boolean;
  error: boolean;
  value: any;
  helperText: string | boolean;
  onChange: (value: string) => void;
}

function SettingField({ onChange, fieldName, isPhone = false, helperText, error, value }: IProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography
        sx={{
          fontFamily: 'Montserrat',
          fontWeight: 500,
          color: colors.grey[700],
        }}
      >
        {fieldName}
      </Typography>
      <FormControl>
        {isPhone ? (
          <MuiPhoneNumber
            sx={{ marginLeft: '5%' }}
            defaultCountry="ua"
            autoFormat={false}
            disableCountryCode
            disableDropdown
            error
            value={value}
            onChange={(e) => {
              if (typeof e === 'string') {
                onChange(e);
                return;
              }

              onChange(e.target.value);
            }}
          />
        ) : (
          <Input
            value={value}
            sx={{ marginLeft: '5%' }}
            placeholder={'Not specified'}
            error={error}
            onChange={(e) => onChange(e.target.value)}
          />
        )}
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    </Box>
  );
}

export default SettingField;
