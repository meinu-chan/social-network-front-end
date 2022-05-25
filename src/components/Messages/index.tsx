import {
  Chip,
  List,
  ListSubheader,
  Box,
  Avatar,
  Typography,
  Grid,
  Theme,
  CircularProgress,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { getMessageList } from '../../api/message';
import { formatChatDate, getFormattedDate } from '../../helpers/momentFormat';
import Message from './Message';
import Textfield from './Textfield';
import clsx from 'clsx';
import useApiRequest, { IRequestFunction } from '../../hooks/useApiRequest';
import { IMessage } from '../../types/Message';
import { IUser } from '../../types/User';
import { addMessageHandler, emit, removeMessageHandler } from '../../socket';
import {
  FromServerConnectionEvent,
  FromServerDisconnectionEvent,
  FromServerReceiveMessageEvent,
} from '../../socket/types/serverEvents';
import Loader from '../Loader';
import { useLastOnlineDate } from '../../hooks/useLastOnlineDate';
import { useNavigate } from 'react-router-dom';
import { appLinks } from '../../router/routes';
import { IChatListItem } from '../../types/Chat';

interface IProps {
  chat: string;
  companion: IUser;
  getChatList: (params: IRequestFunction<never>) => Promise<IChatListItem[]>;
}

const useStyles = makeStyles((theme: Theme) => ({
  list: {
    overflow: 'auto',
    height: '100%',
    display: 'flex',
    flexDirection: 'column-reverse',
  },
  listOfMessage: {
    display: 'flex',
    flexDirection: 'column-reverse',
  },
  chatHeader: {
    position: 'sticky',
    top: 0,
    display: 'flex',
    padding: '1% 10%',
    backgroundColor: theme.palette.primary.main,
  },
  grid: {
    marginLeft: '2%',
    color: theme.palette.background.paper,
    width: 'fit-content !important',
  },
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '80vh',
  },
  headBG: {
    backgroundColor: '#e0e0e0',
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0',
  },
  subheader: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent !important',
    marginTop: '20px',
    top: '1rem !important',
  },
  circularLoader: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '1%',
  },
  infinityLoader: {
    display: 'flex',
    flexDirection: 'column-reverse',
  },
  noMessages: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  offline: {
    color: '#e9e9e9',
  },
  online: {
    color: '#a7d4ff',
  },
  userInfo: {
    display: 'flex',
    cursor: 'pointer',
  },
}));

function Messages({ chat, companion, getChatList }: IProps) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { requestFn: getMessageListApi, data, isLoading } = useApiRequest(getMessageList);
  const [messageLastDate, setMessageLastDate] = useState<Date>();
  const [messages, setMessages] = useState<{ [key: string]: IMessage[] }>({});
  const [online, setOnline] = useState(false);
  const [lastOnline, setLastOnline] = useState(companion.lastOnline);
  const formattedLastOnline = useLastOnlineDate(lastOnline);

  const observer = useRef<IntersectionObserver>();
  const lastMessage = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !!data!.messages.length) {
          getMessageListApi({ args: { chatId: chat, date: messageLastDate } });
        }
      });

      if (node) observer.current.observe(node);
    },
    [chat, data, getMessageListApi, isLoading, messageLastDate]
  );

  const loader = useRef<HTMLDivElement>(null);

  const updateMessages = useCallback((message: IMessage) => {
    const formattedDate = getFormattedDate(new Date(), 'YYYY-MM-DD');

    setMessages((prevMessages) => ({
      ...prevMessages,
      [formattedDate]: [message, ...(prevMessages[formattedDate] || [])],
    }));
  }, []);

  const redirectToUser = useCallback(() => {
    navigate(`${appLinks.index.link}${companion._id}`);
  }, [companion._id, navigate]);

  useEffect(() => {
    setMessageLastDate(undefined);
    setMessages({});
    setOnline(false);

    if (chat) {
      getMessageListApi({ args: { chatId: chat } });
      emit({ event: 'CHAT::JOIN', payload: chat });
    }

    return () => {
      emit({ event: 'CHAT::LEAVE', payload: chat });
    };
  }, [chat, getMessageListApi]);

  useEffect(() => {
    setMessageLastDate(new Date());
    if (data) {
      setMessageLastDate(data.messages[data.messages.length - 1]?.createdAt);

      setMessages((messages) => {
        data.messages.forEach((message) => {
          const formattedDate = getFormattedDate(message.createdAt, 'YYYY-MM-DD');

          if (!messages[formattedDate]) messages[formattedDate] = [];

          if (!messages[formattedDate].includes(message)) messages[formattedDate].push(message);
        });

        return messages;
      });
    }
  }, [data]);

  useEffect(() => {
    addMessageHandler<FromServerReceiveMessageEvent>('CHAT::RECEIVE', updateMessages);

    let timer: NodeJS.Timeout;

    addMessageHandler<FromServerConnectionEvent>('USER::ONLINE', (user) => {
      if (companion._id !== user) return;
      if (timer) clearTimeout(timer);
      setOnline(true);
    });

    addMessageHandler<FromServerDisconnectionEvent>('USER::DISCONNECT', (user) => {
      if (companion._id !== user) return;

      timer = setTimeout(() => {
        if (online) setLastOnline(new Date());
        setOnline(false);
      }, 5000);
    });

    emit({ event: 'USER::IS_ONLINE', payload: companion._id });

    return () => {
      removeMessageHandler('CHAT::RECEIVE');
      removeMessageHandler('USER::ONLINE');
      removeMessageHandler('USER::DISCONNECT');
    };
  }, [companion._id, online, updateMessages]);

  return (
    <>
      <Box className={classes.chatHeader}>
        <Box className={classes.userInfo} onClick={redirectToUser}>
          <Avatar src={companion.photo} alt={companion.fullName} />
          <Grid container direction="column" className={classes.grid}>
            <Grid item>
              <Typography noWrap>{companion.fullName}</Typography>
            </Grid>
            <Grid item>
              <Typography noWrap className={online ? classes.online : classes.offline}>
                {online && 'online'}
                {!online && formattedLastOnline}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {!Object.keys(messages).length ? (
        isLoading ? (
          <Loader fullScreen />
        ) : (
          <Typography className={classes.noMessages} variant="h4">
            {'There is no messages yet'}
          </Typography>
        )
      ) : (
        <List className={clsx(classes.list)} subheader={<ListSubheader />}>
          {Object.entries(messages).map(([date, messagesByDate], rootIndex, rootMessages) => (
            <Box key={date}>
              <ListSubheader className={classes.subheader}>
                <Chip label={formatChatDate(new Date(date))} />
              </ListSubheader>
              <List className={classes.listOfMessage}>
                {messagesByDate.map((message, index, messages) => {
                  const isFirstRootItem = !rootIndex;
                  const isFirstItem = !index;

                  const isLastRootItem = rootIndex + 1 === rootMessages.length;
                  const isLastItem = index + 1 === messages.length;

                  const isSameUser = messages[index - 1]?.author === message.author;
                  const containUnread = !!data?.firstUnreadMessage;
                  const isFirstUnread =
                    containUnread && message._id === data?.firstUnreadMessage._id;
                  const messageConfig = {
                    withTail: (isFirstRootItem && isFirstItem) || !isSameUser,
                    isFirstUnread,
                  };

                  return (
                    <Box ref={isLastRootItem && isLastItem ? lastMessage : null} key={message._id}>
                      <Message {...message} {...messageConfig} companion={companion} />
                    </Box>
                  );
                })}
              </List>
            </Box>
          ))}
          {isLoading && (
            <Box ref={loader} className={classes.circularLoader}>
              <CircularProgress disableShrink />
            </Box>
          )}
        </List>
      )}
      {!!Object.keys(messages).length && (
        <Textfield chatId={chat} companion={companion} handleSending={updateMessages} />
      )}
    </>
  );
}

export default Messages;
