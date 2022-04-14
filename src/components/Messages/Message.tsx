import { ListItem, ListItemText, ListItemAvatar, Avatar, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useRef } from 'react';
import { formatMessageDateTime } from '../../helpers/momentFormat';
import { useAppContext } from '../../store';
import { IMessage } from '../../types/Message';
import clsx from 'clsx';
import useOnScreen from '../../hooks/useOnScreen';

type Props = IMessage;

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    display: 'flex',
    justifyContent: 'center',
  },
  companionMessage: {
    marginRight: '20%',
    backgroundColor: '#a8ddfd',
    border: '1px solid #97c6e3',
    '&:after': {
      borderTop: '15px solid #a8ddfd',
      left: '-15px',
    },
    '&:before': {
      borderTop: '17px solid #97C6E3',
      left: '-17px',
    },
  },
  myMessage: {
    marginLeft: '20% !important',
    backgroundColor: '#f8e896',
    border: '1px solid #dfd087',
    '&:after': {
      borderTop: '15px solid #f8e896',
      right: '-15px',
    },
    '&:before': {
      borderTop: '17px solid #dfd087',
      right: '-17px',
    },
  },
  message: {
    position: 'relative',
    marginLeft: '20px',
    marginBottom: '10px',
    padding: '10px',
    maxWidth: 'fit-content',
    textAlign: 'left',
    borderRadius: '10px',
    '&:after': {
      content: "''",
      position: 'absolute',
      width: '0',
      height: '0',
      borderLeft: '15px solid transparent',
      borderRight: '15px solid transparent',
      top: '0',
    },
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '0',
      height: '0',
      borderLeft: '16px solid transparent',
      borderRight: '16px solid transparent',
      top: '-1px',
    },
  },
  secondaryText: {
    color: 'inherit',
  },
}));

function Message({ text, createdAt, author, _id }: Props) {
  const classes = useStyles();
  const {
    state: { user },
  } = useAppContext();

  const messageRef = useRef<HTMLLIElement>(null);
  const isVisible = useOnScreen(messageRef);

  const isMe = user._id === (typeof author === 'string' ? author : author._id);

  useEffect(() => {
    if (isVisible) console.log(`message >>> ${_id}  is visible!!!`);
  }, [_id, isVisible]);

  return (
    <ListItem
      ref={messageRef}
      sx={{
        alignItems: 'flex-start',
        justifyContent: isMe ? 'flex-end' : 'flex-start',
      }}
    >
      {!isMe && (
        <ListItemAvatar className={classes.avatar}>
          <Avatar alt={author.fullName} src={author.photo} />
        </ListItemAvatar>
      )}
      <ListItemText
        secondaryTypographyProps={{ textAlign: 'right' }}
        className={clsx(classes.message, isMe ? classes.myMessage : classes.companionMessage)}
        primary={text}
        secondary={formatMessageDateTime(createdAt)}
      />
    </ListItem>
  );
}

export default Message;
