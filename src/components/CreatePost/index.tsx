import { TextField, styled, TextFieldProps, Avatar, Box, FormControl } from '@mui/material';
import React, { FormEvent, useState } from 'react';
import { CustomButton } from '../../containers/User';
import { useImageSrc } from '../../hooks/useImageSrc';
import { useAppContext } from '../../store';

const CreatePostTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  fontFamily: 'Montserrat',
  background: '#F6F8FF',
  width: '100%',
}));

function CreatePost() {
  const {
    state: { user },
  } = useAppContext();
  const userAvatar = useImageSrc(user.photo);
  const [textFieldValue, setTextFieldValue] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!textFieldValue.trim()) return;
    console.log('posted');
    setTextFieldValue('');
  };
  return (
    <>
      <Avatar
        src={userAvatar}
        alt={user.fullName}
        sx={{ width: 50, height: 50, alignSelf: 'flex-start', marginRight: '2%' }}
      />
      <Box
        component="form"
        sx={{ width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <FormControl fullWidth>
          <CreatePostTextField
            multiline
            value={textFieldValue}
            placeholder="What is in your mind? ..."
            onChange={(e) => setTextFieldValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                handleSubmit(e);
                e.preventDefault();
              }
            }}
          />
        </FormControl>
        <CustomButton
          type="submit"
          variant="contained"
          sx={{ width: 'fit-content', margin: '2% 0' }}
        >
          Post
        </CustomButton>
      </Box>
    </>
  );
}

export default CreatePost;
