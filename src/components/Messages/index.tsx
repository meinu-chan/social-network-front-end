import { Chip, List, ListSubheader } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { getMessageList } from '../../api/message';
import { formatChatDate, getFormattedDate } from '../../helpers/momentFormat';
import Loader from '../Loader';
import Message from './Message';
import Textfield from './Textfield';
import clsx from 'clsx';
import useApiRequest from '../../hooks/useApiRequest';
import { IMessage } from '../../types/Message';

interface IProps {
  chat: string;
}

const useStyles = makeStyles({
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
  },
  loadingHeight: {
    height: '100%',
  },
});

function Messages({ chat }: IProps) {
  const classes = useStyles();
  const { requestFn: getMessageListApi, data, isLoading } = useApiRequest(getMessageList);
  const [messageData, setMessageData] = useState<typeof data>();

  const handleMessageUpdate = (message: IMessage) => {
    if (!messageData) return;

    const createdDate = getFormattedDate(message.createdAt);

    const messageByDate = messageData[createdDate];

    messageByDate.push(message);

    setMessageData((messages) => ({ ...messages, [createdDate]: messageByDate }));
  };

  useEffect(() => {
    if (chat) getMessageListApi({ args: { chatId: chat } });
  }, [chat, getMessageListApi]);

  useEffect(() => {
    setMessageData(data);
  }, [data]);

  return (
    <>
      <List subheader={<ListSubheader />} className={clsx({ [classes.loadingHeight]: isLoading })}>
        {isLoading ? (
          <Loader fullScreen />
        ) : (
          messageData &&
          Object.entries(messageData).map(([date, messages]) => (
            <div key={date}>
              <ListSubheader className={classes.subheader}>
                <Chip label={formatChatDate(new Date(date))} />
              </ListSubheader>
              {messages.map((message) => (
                <Message {...message} key={message._id} />
              ))}
            </div>
          ))
        )}
      </List>
      {!isLoading && <Textfield chatId={chat} handleSending={handleMessageUpdate} />}
    </>
  );
}

export default Messages;
