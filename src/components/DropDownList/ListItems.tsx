import { ListItemButton, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import React from 'react';
import { useImageSrc } from '../../hooks/useImageSrc';
import { UserData } from '../../types/User';

interface IProps extends Pick<UserData, 'fullName' | 'photo' | 'nickname'> {
  handleSelect: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

function ListItems({ fullName, photo, nickname, handleSelect }: IProps) {
  const imageSrc = useImageSrc(photo || '');

  return (
    <ListItemButton divider onClick={handleSelect}>
      <ListItemAvatar>
        <Avatar src={imageSrc} />
      </ListItemAvatar>
      <ListItemText primary={`${fullName} ${nickname ? `(${nickname})` : ''}`} />
    </ListItemButton>
  );
}

export default ListItems;
