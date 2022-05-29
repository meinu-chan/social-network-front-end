import { Box, Grid, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React, { useEffect, useState } from 'react';
import Friend from '../../components/Friend';
import { useNavigate, useParams } from 'react-router-dom';
import useApiRequest from '../../hooks/useApiRequest';
import { communityList, unsubscribeOnUser } from '../../api/userApi';
import Loader from '../../components/Loader';
import { UserData } from '../../types/User';
import { useAppContext } from '../../store';

interface IProps {
  type: 'subscribers' | 'subscriptions';
}

function Friends({ type }: IProps) {
  const navigate = useNavigate();
  const params = useParams();
  const [friends, setFriends] = useState<UserData[]>([]);

  const {
    state: { user },
  } = useAppContext();

  const { requestFn: communityListApi, data, isLoading } = useApiRequest(communityList);
  const { requestFn: unsubscribeOnUserApi, isLoading: isLoadingUnsub } =
    useApiRequest(unsubscribeOnUser);

  const isMe = params.userId === user._id;
  const showDeleteButton = type === 'subscriptions';

  useEffect(() => {
    if (!params.userId) return;
    const reqType = type === 'subscriptions' ? 'subscribed' : type;
    communityListApi({ args: { userId: params.userId, type: reqType } });
  }, [communityListApi, params.userId, type]);

  const handleUnsubscribe = (userId: string) => {
    if (type !== 'subscriptions') return;

    unsubscribeOnUserApi({ args: userId });
    setFriends(friends.filter((friend) => friend._id !== userId));
  };

  useEffect(() => {
    if (!data) return;
    setFriends(data);
  }, [data]);

  return (
    <Box
      sx={{ height: `calc(100vh - ${document.getElementsByTagName('header')[0].clientHeight}px)` }}
    >
      {isLoading && <Loader fullScreen />}
      <Box sx={{ margin: '0 5%', bgcolor: 'background.paper', height: '100%' }}>
        <Box sx={{ display: 'flex' }}>
          <IconButton
            sx={{ '&:hover': { bgcolor: 'background.paper' } }}
            onClick={() => navigate(-1)}
          >
            <ArrowBackIcon fontSize="large" />
          </IconButton>
          <Typography variant="h3" sx={{ padding: '2% 1%', textTransform: 'capitalize' }}>
            {type}
          </Typography>
        </Box>
        {!friends.length && (
          <Box
            sx={{ height: '80%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Typography variant="h3">No {type}</Typography>
          </Box>
        )}
        {!!friends.length && (
          <Grid container sx={{ padding: '0 5%' }}>
            {friends.map((user) => (
              <Grid item md={6}>
                <Friend
                  {...user}
                  remove={handleUnsubscribe}
                  isLoading={isLoadingUnsub}
                  isMe={isMe}
                  showDeleteButton={showDeleteButton}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
}

export default Friends;
