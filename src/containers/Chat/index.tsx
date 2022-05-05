import { Grid, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import Messages from '../../components/Messages';
import ChatList from '../../components/ChatList';
import colors from '../../theme/colors';
import { IUser } from '../../types/User';

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
}));

const Chat = () => {
  const classes = useStyles();
  const [selectItem, setSelectItem] = useState('');
  const [companion, setCompanion] = useState<IUser | null>(null);

  const handleClick = (chatId: string, companion: IUser) => {
    setSelectItem(chatId);
    setCompanion(companion);
  };

  return (
    <Grid container className={classes.container} sx={{ flexWrap: 'nowrap' }}>
      <Grid item className={classes.listOfChats}>
        <ChatList handleClick={handleClick} selectedItem={selectItem} />
      </Grid>
      <Grid item className={classes.chat} sx={{ flexDirection: 'column' }}>
        {companion && <Messages chat={selectItem} companion={companion} />}
      </Grid>
    </Grid>
  );
};

export default Chat;
