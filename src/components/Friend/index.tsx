import {
  ListItem,
  ListItemAvatar,
  Avatar,
  Box,
  Typography,
  IconButton,
  CircularProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import { UserData } from '../../types/User';
import { useImageSrc } from '../../hooks/useImageSrc';
import { useNavigate } from 'react-router-dom';
import { appLinks } from '../../router/routes';

interface IProps extends UserData {
  isLoading: boolean;
  remove: (userId: string) => void;
  isMe: boolean;
  showDeleteButton: boolean;
}

function Friend({ fullName, photo, _id, remove, isLoading, isMe, showDeleteButton }: IProps) {
  const userAvatarSrc = useImageSrc(photo);
  const navigate = useNavigate();

  return (
    <ListItem
      sx={{
        cursor: 'pointer',
        '&:hover': {
          background: '#F6F8FF',
        },
      }}
    >
      <ListItemAvatar
        sx={{ marginRight: '5%' }}
        onClick={() => navigate(`${appLinks.index.link}${_id}`)}
      >
        <Avatar sx={{ width: 90, height: 90 }} src={userAvatarSrc} />
      </ListItemAvatar>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Typography variant="h4" onClick={() => navigate(`${appLinks.index.link}${_id}`)}>
          {fullName}
        </Typography>
        {isMe && showDeleteButton && (
          <IconButton onClick={() => remove(_id)} disabled={isLoading}>
            {isLoading ? <CircularProgress /> : <DeleteIcon fontSize="large" />}
          </IconButton>
        )}
      </Box>
    </ListItem>
  );
}

export default Friend;
