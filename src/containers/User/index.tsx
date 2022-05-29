import {
  Box,
  Button,
  ButtonGroup,
  ButtonProps,
  CircularProgress,
  Grid,
  Modal,
  styled,
  TextField,
  Theme,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import SendIcon from '@mui/icons-material/Send';
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getUserById, subscribeOnUser, unsubscribeOnUser } from '../../api/userApi';
import UserAvatar from '../../components/UserAvatar/';
import Loader from '../../components/Loader';
import ProfileAvatar from '../../components/ProfileAvatar';
import { addMessageHandler, emit, removeMessageHandler } from '../../socket';
import useApiRequest from '../../hooks/useApiRequest';
import {
  FromServerConnectionEvent,
  FromServerDisconnectionEvent,
} from '../../socket/types/serverEvents';
import colors from '../../theme/colors';
import { useAppContext } from '../../store';
import CreatePost from '../../components/CreatePost';
import Post from '../../components/Post';
import { startChat } from '../../api/chat';
import { createMessageApi } from '../../api/message';
import { postList } from '../../api/post';
import { PostListItem } from '../../types/Post';
import useLoadMore from '../../hooks/useLoadMore';

const useStyles = makeStyles((theme: Theme) => ({
  aboutUser: {
    backgroundColor: theme.palette.primary.main,
    color: colors.bgLight,
    padding: '3%',
    borderRadius: '50px',
    '.MuiGrid-item': {
      padding: 0,
    },
  },
  aboutMeTypography: {
    fontFamily: 'Montserrat',
    fontWeight: 500,
    fontSize: '1rem',
    lineHeight: '22px',
  },
  addToFriends: {
    position: 'absolute',
    right: '0',
    transform: 'translate(-10%, -50%)',
  },
  postTextField: {
    width: '50%',
    borderRadius: '50px',
  },
  gridItemCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export const CustomButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(theme.palette.primary.main),
  borderRadius: '50px',
  textTransform: 'initial',
  fontFamily: 'Montserrat',
  fontWeight: 500,
  fontSize: '1rem',
}));

function User() {
  const classes = useStyles();
  const { userId } = useParams();
  const location = useLocation();
  const [isOnline, setIsOnline] = useState(false);
  const navigate = useNavigate();
  const {
    state: { user },
  } = useAppContext();
  const [isMeSubscribed, setIsMeSubscribed] = useState(false);

  const isMe = user._id === userId;

  const [openModal, setOpenModal] = useState(false);
  const [messageValue, setMessageValue] = useState('');
  const [posts, setPosts] = useState<PostListItem[]>([]);
  const [lastPostDate, setLastPostDate] = useState<Date>();

  const handleCreatedPost = (post: PostListItem) => {
    setPosts((prev) => [post, ...prev]);
  };

  const { requestFn: subscribeApi } = useApiRequest(subscribeOnUser);
  const { requestFn: unsubscribeApi } = useApiRequest(unsubscribeOnUser);

  const handleScribeButton = async () => {
    if (isMeSubscribed) {
      unsubscribeApi({ args: userId });
      setIsMeSubscribed(false);
      return;
    }

    subscribeApi({ args: userId });
    setIsMeSubscribed(true);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const {
    requestFn: getUserApi,
    isLoading,
    data,
  } = useApiRequest(getUserById, {
    showSuccessMessage: false,
  });

  const { requestFn: startChatApi, isLoading: startChatLoading } = useApiRequest(startChat);
  const { requestFn: sendMessage } = useApiRequest(createMessageApi, {
    showSuccessMessage: true,
  });
  const {
    requestFn: postListApi,
    isLoading: postListLoading,
    data: postResponse,
  } = useApiRequest(postList);

  const loadMore = useCallback(async () => {
    if (userId && postResponse)
      postListApi({
        args: {
          userId,
          limit: 10,
          createdAt: lastPostDate,
        },
      });
  }, [lastPostDate, postListApi, postResponse, userId]);

  const lastItem = useLoadMore(postListLoading, !!postResponse?.length, loadMore);

  useEffect(() => {
    if (userId) postListApi({ args: { userId, limit: 10 } });

    return () => {
      setPosts([]);
    };
  }, [postListApi, userId]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    addMessageHandler<FromServerConnectionEvent>('USER::ONLINE', (user) => {
      if (userId !== user) return;
      if (timer) clearTimeout(timer);
      setIsOnline(true);
    });

    addMessageHandler<FromServerDisconnectionEvent>('USER::DISCONNECT', (user) => {
      if (userId !== user) return;
      timer = setTimeout(() => setIsOnline(false), 5000);
    });

    if (userId) {
      emit({ event: 'USER::IS_ONLINE', payload: userId });
      getUserApi({ args: userId });
    }

    return () => {
      removeMessageHandler('USER::ONLINE');
      removeMessageHandler('USER::DISCONNECT');
      removeMessageHandler('GLOBAL::CHAT::RECEIVE');
    };
  }, [getUserApi, userId]);

  useEffect(() => {
    if (!isMe && data) {
      setIsMeSubscribed(data.subscribers.includes(user._id));
    }
  }, [data, isMe, user._id]);

  useEffect(() => {
    if (!postResponse) return;
    setPosts((prev) => [...prev, ...postResponse]);

    if (postResponse.length) setLastPostDate(postResponse[postResponse.length - 1].createdAt);
  }, [postResponse]);

  const handleSendMessage = useCallback(async () => {
    if (!data) return;
    const chat = await startChatApi({ args: { isPrivate: true, withUser: data._id } });

    sendMessage({
      args: { chatId: chat._id, payload: { text: messageValue } },
      successMessage: 'Sended.',
    });

    setMessageValue('');
    handleCloseModal();
  }, [data, messageValue, sendMessage, startChatApi]);

  return (
    <Box
      sx={{
        margin: '0 10% 5% 10%',
        background: colors.paperLight,
        minHeight: '100vh',
        borderRadius: '0 0 50px 50px',
      }}
    >
      {(isLoading || startChatLoading) && <Loader fullScreen />}
      {!isLoading && data && (
        <Grid container wrap="nowrap" direction="column" xs={12} md={10} sx={{ margin: 'auto' }}>
          <Grid item>
            <ProfileAvatar {...data}>
              <>
                <UserAvatar {...data} online={isOnline} />
                {!isMe && (
                  <Grid item className={classes.addToFriends}>
                    <ButtonGroup>
                      <CustomButton
                        variant="contained"
                        size="large"
                        startIcon={<ChatBubbleOutlineIcon />}
                        onClick={handleOpenModal}
                      >
                        Chat
                      </CustomButton>
                      <CustomButton
                        variant="contained"
                        size="large"
                        endIcon={!isMeSubscribed && <AddOutlinedIcon />}
                        onClick={handleScribeButton}
                      >
                        {isMeSubscribed ? 'Unsubscribe' : 'Subscribe'}
                      </CustomButton>
                    </ButtonGroup>
                  </Grid>
                )}
              </>
            </ProfileAvatar>
          </Grid>
          <Grid item>
            <Typography
              variant="h4"
              color="#50514F"
              sx={{ m: '1% 0 2% 20%', fontWeight: 700, fontFamily: 'Montserrat' }}
            >
              {data.fullName}
            </Typography>
          </Grid>
          {data.nickname && (
            <Grid item>
              <Typography align="center" variant="subtitle1">
                {data.nickname}
              </Typography>
            </Grid>
          )}
          <Grid item>
            <Grid container flexDirection="column" className={classes.aboutUser} rowSpacing={2}>
              <Grid item>
                <Typography
                  sx={{
                    fontFamily: 'Montserrat',
                    fontWeight: 500,
                    lineHeight: '22px',
                    fontSize: '1.5rem',
                  }}
                >
                  Studies: {data.university || data.school || 'not specified'}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  sx={{
                    fontFamily: 'Montserrat',
                    fontWeight: 500,
                    lineHeight: '22px',
                    fontSize: '1.5rem',
                  }}
                >
                  Working at: {data.job || 'not specified'}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  sx={{
                    fontFamily: 'Montserrat',
                    fontWeight: 500,
                    lineHeight: '22px',
                    fontSize: '1.5rem',
                  }}
                >
                  Hobbies: {data.hobbies || 'not specified'}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  sx={{
                    fontFamily: 'Montserrat',
                    fontWeight: 500,
                    lineHeight: '22px',
                    fontSize: '1.5rem',
                  }}
                >
                  Phone number:{data.phone || 'not specified'}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.gridItemCenter}>
            <ButtonGroup size="large">
              <CustomButton
                variant="contained"
                sx={{ margin: '2% 0' }}
                onClick={() => navigate(`${location.pathname}/subscribers`)}
              >
                Subscribers
              </CustomButton>
              <CustomButton
                variant="contained"
                sx={{ margin: '2% 0' }}
                onClick={() => navigate(`${location.pathname}/subscriptions`)}
              >
                Subscriptions
              </CustomButton>
            </ButtonGroup>
          </Grid>
          {isMe && (
            <Grid item className={classes.gridItemCenter}>
              <CreatePost create={handleCreatedPost} />
            </Grid>
          )}
          {posts.map((post, index) => (
            <Grid
              item
              ref={index + 1 === posts.length ? lastItem : null}
              className={classes.gridItemCenter}
              key={post._id}
            >
              <Post {...post} />
            </Grid>
          ))}
          {postListLoading && (
            <Grid item className={classes.gridItemCenter}>
              <CircularProgress disableShrink />
            </Grid>
          )}
        </Grid>
      )}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            alignItems: 'flex-end',
            p: 4,
          }}
        >
          <TextField
            multiline
            placeholder="Message..."
            maxRows={10}
            autoComplete="off"
            rows={10}
            value={messageValue}
            fullWidth
            onChange={(e) => setMessageValue(e.target.value)}
          />
          <Button
            variant="contained"
            sx={{ marginTop: 2 }}
            onClick={handleSendMessage}
            endIcon={<SendIcon />}
          >
            Send
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}

export default User;
