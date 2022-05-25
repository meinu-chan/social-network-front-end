import { ListItem, Theme, Typography, Box, ListItemText } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { formatMessageDateTime } from '../../helpers/momentFormat';
import { useAppContext } from '../../store';
import { IMessage } from '../../types/Message';
import clsx from 'clsx';
import useOnScreen from '../../hooks/useOnScreen';
import { readMessage } from '../../api/message';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { addMessageHandler, emit, removeMessageHandler } from '../../socket';
import { FromServerReadMessageEvent } from '../../socket/types/serverEvents';
import { IUser } from '../../types/User';
interface IProps extends IMessage {
  withTail: boolean;
  isFirstUnread?: boolean;
  companion: IUser;
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
  messageInfo: {
    display: 'flex',
  },
  asColumn: {
    flexDirection: 'column',
    marginTop: '0% !important',
  },
}));

function Message({ withTail, companion, isFirstUnread = false, ...messageData }: IProps) {
  const classes = useStyles();
  const {
    state: { user },
  } = useAppContext();

  const [message, setMessage] = useState(messageData);
  const messageRef = useRef<HTMLLIElement>(null);
  const isVisible = useOnScreen(messageRef);

  const isMe = user._id === message.author;
  const isLong = message.text.length > 15;

  const readMessageApi = useCallback(
    async (messageId: string) => {
      const message = await readMessage(messageId);

      setMessage(message);

      emit({ event: 'MESSAGE::READ', payload: { chat: message.chat, message } });
      emit({ event: 'GLOBAL::NOTIFY::MESSAGE_RECEIVE', payload: companion._id });
    },
    [companion._id]
  );

  useEffect(() => {
    addMessageHandler<FromServerReadMessageEvent>('MESSAGE::READ', (payload) => {
      if (payload._id === message._id && isMe) {
        setMessage(payload);
        emit({ event: 'GLOBAL::NOTIFY::MESSAGE_RECEIVE', payload: companion._id });
      }
    });

    return () => {
      removeMessageHandler('MESSAGE::READ');
    };
  }, [companion._id, isMe, message._id]);

  useEffect(() => {
    if (!isVisible) return;

    if (!isMe && !message.readBy.includes(user._id)) {
      readMessageApi(message._id);
    }
  }, [isVisible, message._id, message.readBy, readMessageApi, isMe, user._id]);

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
        <ListItemText
          className={clsx(classes.messageInfo, { [classes.asColumn]: isLong })}
          primary={message.text}
          secondary={
            <React.Fragment>
              <Typography mr="0.5rem">{formatMessageDateTime(message.createdAt)}</Typography>
              {isMe && (!message.readBy.length ? <DoneIcon fontSize="small" /> : <DoneAllIcon />)}
            </React.Fragment>
          }
          secondaryTypographyProps={{
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              marginTop: isLong ? '0' : '0.8rem',
              marginLeft: '1rem',
              color: isMe ? '#fff' : '#505050',
            },
            variant: 'caption',
          }}
          primaryTypographyProps={{
            variant: 'h6',
            style: {
              fontWeight: '300',
            },
          }}
        />
      </Box>
    </ListItem>
  );
}

export default Message;
