import { ListItem, Theme, Typography, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useRef, useState } from 'react';
import { formatMessageDateTime } from '../../helpers/momentFormat';
import { useAppContext } from '../../store';
import { IMessage } from '../../types/Message';
import clsx from 'clsx';
import useOnScreen from '../../hooks/useOnScreen';
import useApiRequest from '../../hooks/useApiRequest';
import { readMessage } from '../../api/message';

interface IProps extends IMessage {
  withTail: boolean;
  isFirstUnread?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  companionMessage: {
    alignItems: 'flex-start',
    backgroundColor: '#e5e5ea',
    color: '#000',
    '&:after': {
      backgroundColor: '#fff',
      borderBottomRightRadius: '0.5rem',
      left: '20px',
      transform: 'translate(-30px, -2px)',
      width: '10px',
    },
    '&:before': {
      borderBottomRightRadius: '0.8rem 0.7rem',
      borderLeft: '1rem solid #e5e5ea',
      left: '-0.35rem',
      transform: 'translate(0, -0.1rem)',
    },
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#248bf5',
    color: '#fff',
    '&:before': {
      borderBottomLeftRadius: '0.8rem 0.7rem',
      borderRight: '1rem solid #248bf5',
      right: '-0.35rem',
      transform: 'translate(0, -0.1rem)',
    },
    '&:after': {
      backgroundColor: '#fff',
      borderBottomLeftRadius: '0.5rem',
      right: '-40px',
      transform: 'translate(-30px, -2px)',
      width: '10px',
    },
  },
  noTail: {
    '&:before': {
      display: 'none',
    },
  },
  message: {
    display: 'flex',
    borderRadius: '1.15rem',
    lineHeight: '1.25',
    maxWidth: '75%',
    padding: '0.5rem .875rem',
    position: 'relative',
    wordWrap: 'break-word',
    margin: '0.5rem 0',
    width: 'fit-content',
    '&:after': {
      bottom: '-0.1rem',
      content: "''",
      height: '1rem',
      position: 'absolute',
    },
    '&:before': {
      bottom: '-0.1rem',
      content: "''",
      height: '1rem',
      position: 'absolute',
    },
  },
  typographyDate: {
    width: '100%',
  },
}));

function Message({ withTail, isFirstUnread = false, ...messageData }: IProps) {
  const classes = useStyles();
  const {
    state: { user },
  } = useAppContext();
  const { requestFn: readMessageApi } = useApiRequest(readMessage);

  const [message, setMessage] = useState(messageData);
  const messageRef = useRef<HTMLLIElement>(null);
  const isVisible = useOnScreen(messageRef);

  const isMe = user._id === message.author;

  useEffect(() => {
    if (!isVisible) return;

    if (message.author !== user._id || !message.readBy.includes(user._id)) {
      // readMessageApi({ args: message._id });
    }
  }, [isVisible, message._id, message.author, message.readBy, readMessageApi, user._id]);

  useEffect(() => {
    if (isFirstUnread) messageRef.current?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, [isFirstUnread]);

  return (
    <ListItem
      ref={messageRef}
      sx={{ justifyContent: `flex-${isMe ? 'end' : 'start'}`, scrollMarginTop: '2.5rem' }}
    >
      <Box
        className={clsx(classes.message, isMe ? classes.myMessage : classes.companionMessage, {
          [classes.noTail]: !withTail,
        })}
      >
        <Typography component="p">{message.text}</Typography>
      </Box>
    </ListItem>
  );
}

export default Message;
