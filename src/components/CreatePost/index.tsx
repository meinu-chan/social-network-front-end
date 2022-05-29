import {
  TextField,
  styled,
  TextFieldProps,
  Avatar,
  Box,
  FormControl,
  CircularProgress,
} from '@mui/material';
import React, { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createPost } from '../../api/post';
import { CustomButton } from '../../containers/User';
import useApiRequest from '../../hooks/useApiRequest';
import { useImageSrc } from '../../hooks/useImageSrc';
import { useAppContext } from '../../store';
import { PostListItem } from '../../types/Post';

interface IProps {
  create: (post: PostListItem) => void;
}

const CreatePostTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  fontFamily: 'Montserrat',
  background: '#F6F8FF',
  width: '100%',
}));

function CreatePost({ create }: IProps) {
  const {
    state: { user },
  } = useAppContext();
  const location = useParams();
  const userAvatar = useImageSrc(user.photo);
  const [textFieldValue, setTextFieldValue] = useState('');

  const { requestFn, isLoading } = useApiRequest(createPost, { showSuccessMessage: true });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!textFieldValue.trim()) return;
    if (!location.userId) return;

    const post = await requestFn({
      args: { page: location.userId, text: textFieldValue },
      successMessage: 'Post created.',
    });

    create({ ...post, user });
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
          disabled={!textFieldValue}
          type="submit"
          variant="contained"
          sx={{ width: 'fit-content', margin: '2% 0' }}
        >
          {isLoading ? <CircularProgress /> : 'Post'}
        </CustomButton>
      </Box>
    </>
  );
}

export default CreatePost;
