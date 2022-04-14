import { Grid, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import Messages from '../../components/Messages';
import ChatList from '../../components/ChatList';
import colors from '../../theme/colors';

const useStyles = makeStyles((theme: Theme) => ({
  listOfChats: {
    minWidth: '30%',
    height: '100%',
  },
  chat: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'relative',
    width: '100%',
    borderLeft: `1px solid ${colors.lightGray}`,
    overflow: 'auto',
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

  const handleClick = (chatId: string) => {
    setSelectItem(chatId);
  };

  return (
    <Grid container className={classes.container} sx={{ flexWrap: 'nowrap' }}>
      <Grid item className={classes.listOfChats}>
        <ChatList handleClick={handleClick} selectedItem={selectItem} />
      </Grid>
      <Grid item className={classes.chat} sx={{ flexDirection: 'column' }}>
        <Messages chat={selectItem} />
      </Grid>
    </Grid>
  );
};

export default Chat;
