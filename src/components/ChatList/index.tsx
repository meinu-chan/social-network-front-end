import React, { useEffect } from 'react';
import { List } from '@mui/material';
import { getChatList } from '../../api/chat';
import useApiRequest from '../../hooks/useApiRequest';
import ChatItem from './ChatItem';

interface IProps {
  handleClick: (chatId: string) => void;
  selectedItem: string;
}

function ChatList(props: IProps) {
  const { data, requestFn: getChatApi } = useApiRequest(getChatList);

  useEffect(() => {
    getChatApi({
      args: 0,
    });
  }, [getChatApi]);

  return (
    <List disablePadding>
      {data && data.map((chat) => <ChatItem {...chat} {...props} key={chat._id} />)}
    </List>
  );
}

export default ChatList;
