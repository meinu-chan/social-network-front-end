import { Grid, List, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import Messages from '../../components/Messages';
import colors from '../../theme/colors';
import { IUser } from '../../types/User';
import { getChatList } from '../../api/chat';
import useApiRequest from '../../hooks/useApiRequest';
import ChatItem from '../../components/ChatItem';
import { addMessageHandler, emit, removeMessageHandler } from '../../socket';
import { IChatListItem } from '../../types/Chat';
import {
  FromServerGlobalReceiveMessageEvent,
  FromServerReceiveMessageEvent,
} from '../../socket/types/serverEvents';

const useStyles = makeStyles((theme: Theme) => ({
  listOfChats: {
    minWidth: '30%',
    height: '100%',
  },
  chat: {
    display: 'flex',
    justifyContent: 'flex-start',
    position: 'relative',
    width: '100%',
    borderLeft: `1px solid ${colors.lightGray}`,
  },
  container: {
    width: 'auto !important',
    height: `calc(100vh - ${document.getElementsByTagName('header')[0].clientHeight}px)`,
    margin: '0 10%',
    borderRight: `1px solid ${colors.lightGray}`,
    borderLeft: `1px solid ${colors.lightGray}`,
    flexWrap: 'nowrap',
  },
  chatNotSelected: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const Chat = () => {
  const classes = useStyles();
  const [selectItem, setSelectItem] = useState('');
  const [companion, setCompanion] = useState<IUser | null>(null);
  const [chats, setChats] = useState<{ [key: string]: IChatListItem }>({});

  const { data, requestFn: getChatApi } = useApiRequest(getChatList);

  useEffect(() => {
    getChatApi({});
    addMessageHandler<FromServerGlobalReceiveMessageEvent>('GLOBAL::CHAT::RECEIVE', () => {
      getChatApi({});
    });

    return () => removeMessageHandler('GLOBAL::CHAT::RECEIVE');
  }, [getChatApi]);

  const handleClick = (chatId: string, companion: IUser) => {
    setSelectItem(chatId);
    setCompanion(companion);
  };

  useEffect(() => {
    if (!data) return;

    setChats((prev) => {
      data.forEach((chat) => {
        prev[chat._id] = chat;
      });

      return prev;
    });
  }, [data]);

  return (
    <Grid container className={classes.container} sx={{ flexWrap: 'nowrap' }}>
      <Grid item className={classes.listOfChats}>
        <List disablePadding>
          {Object.keys(chats) &&
            Object.entries(chats).map(([key, chat]) => (
              <ChatItem handleClick={handleClick} selectedItem={selectItem} key={key} {...chat} />
            ))}
        </List>
      </Grid>
      <Grid item className={classes.chat} sx={{ flexDirection: 'column' }}>
        {!selectItem && (
          <Typography className={classes.chatNotSelected} variant="h4">
            {'Select chat to start chatting'}
          </Typography>
        )}
        {companion && <Messages chat={selectItem} companion={companion} getChatList={getChatApi} />}
      </Grid>
    </Grid>
  );
};

export default Chat;
