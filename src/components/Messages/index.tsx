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
import { formatChatDate, formatOnlineDate, getFormattedDate } from '../../helpers/momentFormat';
import Message from './Message';
import Textfield from './Textfield';
import clsx from 'clsx';
import useApiRequest from '../../hooks/useApiRequest';
import { IMessage } from '../../types/Message';
import { IUser } from '../../types/User';
import InfiniteScroll from '../InfiniteScroll';

interface IProps {
  chat: string;
  companion: IUser;
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
    flexDirection: 'row',
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
}));

function Messages({ chat, companion }: IProps) {
  const classes = useStyles();
  const { requestFn: getMessageListApi, data, isLoading } = useApiRequest(getMessageList);
  const [messageLastDate, setMessageLastDate] = useState<Date>();
  const [messages, setMessages] = useState<{ [key: string]: IMessage[] }>({});

  const lastMessage = useRef<HTMLDivElement>(null);
  const loader = useRef<HTMLDivElement>(null);

  const loadMoreMessages = useCallback(async () => {
    if (messageLastDate) getMessageListApi({ args: { chatId: chat, date: messageLastDate } });
    if (loader.current) loader.current.scrollIntoView({ behavior: 'smooth' });
  }, [chat, getMessageListApi, messageLastDate]);

  const sendMessage = (message: IMessage) => {
    const formattedDate = getFormattedDate(new Date(), 'YYYY-MM-DD');

    setMessages((prevMessages) => ({
      ...prevMessages,
      [formattedDate]: [message, ...(prevMessages[formattedDate] || [])],
    }));
  };

  useEffect(() => {
    setMessageLastDate(undefined);
    setMessages({});

    if (chat) getMessageListApi({ args: { chatId: chat } });
  }, [chat, getMessageListApi]);

  useEffect(() => {
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

  return (
    <>
      <Box className={classes.chatHeader}>
        <Avatar src={companion.photo} alt={companion.fullName} />
        <Grid container className={classes.grid}>
          <Grid item>
            <Typography>{companion.fullName}</Typography>
          </Grid>
          <Grid item>
            <Typography>{formatOnlineDate(new Date())}</Typography>
          </Grid>
        </Grid>
      </Box>
      {Object.keys(messages).length && (
        <InfiniteScroll
          hasMore={!!data!.messages.length}
          loadMore={loadMoreMessages}
          lastItem={lastMessage}
          showLoader={isLoading}
          loader={
            <Box ref={loader} className={classes.circularLoader}>
              <CircularProgress />
            </Box>
          }
          className={clsx(classes.list)}
          subheader={<ListSubheader />}
        >
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

                  const isSameUser = messages[index - 1]?.author === message.author;
                  const containUnread = !!data?.firstUnreadMessage;
                  const isFirstUnread =
                    containUnread && message._id === data?.firstUnreadMessage._id;

                  const messageConfig = {
                    withTail: (isFirstRootItem && isFirstItem) || !isSameUser,
                    isFirstUnread,
                  };

                  return (
                    <Box ref={isLastRootItem ? lastMessage : null} key={message._id}>
                      <Message {...message} {...messageConfig} />
                    </Box>
                  );
                })}
              </List>
            </Box>
          ))}
        </InfiniteScroll>
      )}
      <Textfield chatId={chat} handleSending={sendMessage} />
    </>
  );
}

export default Messages;
