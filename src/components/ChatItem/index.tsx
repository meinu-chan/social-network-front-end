import React, { useMemo } from 'react';
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Theme,
  Typography,
  Badge,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useAppContext } from '../../store';
import { IChatListItem } from '../../types/Chat';
import clsx from 'clsx';
import colors from '../../theme/colors';
import { IUser } from '../../types/User';

const useStyles = makeStyles((theme: Theme) => ({
  listItem: {
    cursor: 'pointer',
    '&:hover': {
      background: colors.lightGray,
      transition: '0.3s',
    },
  },
  chosenItem: {
    background: colors.lightGray,
  },
}));

interface IProps extends IChatListItem {
  handleClick: (chatId: string, companion: IUser) => void;
  selectedItem: string;
}

const handleLongText = (text: string) => (text.length > 25 ? `${text.slice(0, 25)}...` : text);

function ChatItem({
  _id: chatId,
  unread,
  lastMessage,
  members,
  handleClick,
  selectedItem,
}: IProps) {
  const classes = useStyles();
  const {
    state: { user },
  } = useAppContext();

  const [member] = useMemo(
    () => members.filter((chatUser) => chatUser._id !== user._id),
    [members, user._id]
  );

  return (
    <ListItem
      alignItems="flex-start"
      secondaryAction={<Badge badgeContent={unread} color="primary" max={9} />}
      divider
      className={clsx(classes.listItem, { [classes.chosenItem]: selectedItem === chatId })}
      onClick={() => handleClick(chatId, member)}
    >
      <ListItemAvatar>
        <Avatar src={member.photo} alt={member.fullName} />
      </ListItemAvatar>
      <ListItemText
        primary={member.fullName}
        secondary={
          <React.Fragment>
            <Typography component="span">{handleLongText(lastMessage?.text || '')}</Typography>
          </React.Fragment>
        }
      />
    </ListItem>
  );
}

export default ChatItem;
