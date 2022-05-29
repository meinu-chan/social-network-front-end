import {
  Avatar,
  Box,
  Button,
  colors,
  styled,
  Typography,
  ButtonProps,
  Collapse,
  List,
  TextField,
  ListItem,
  Modal,
  Skeleton,
  CircularProgress,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import React, { useCallback, useEffect, useState } from 'react';
import Comment from '../Comment';
import { useImageSrc } from '../../hooks/useImageSrc';
import { PostListItem } from '../../types/Post';
import useApiRequest from '../../hooks/useApiRequest';
import { likeList, setLike } from '../../api/like';
import { commentsList, createComment } from '../../api/comment';
import { CommentListItem } from '../../types/Comment';
import { useAppContext } from '../../store';
import useLoadMore from '../../hooks/useLoadMore';

type Props = PostListItem;

const CommentButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText('#F6F8FF'),
}));

function Post({ user, text, _id }: Props) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [collapse, setCollapsed] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [commentValue, setCommentValue] = useState('');
  const [comments, setComments] = useState<CommentListItem[]>([]);
  const [lastComment, setLastComment] = useState<CommentListItem>();
  const [collapseComment, setCollapseComment] = useState<CommentListItem[]>([]);
  const [lastCommentDate, setLastCommentDate] = useState<Date>();
  const {
    state: { user: me },
  } = useAppContext();

  const photoSrc = useImageSrc(user.photo);

  const { requestFn: likeListApi, data: likeListRes, isLoading } = useApiRequest(likeList);
  const { requestFn: setLikeApi } = useApiRequest(setLike);

  const { requestFn: createCommentApi } = useApiRequest(createComment, {
    showSuccessMessage: true,
  });
  const {
    requestFn: listCommentApi,
    data: commentListRes,
    isLoading: isLoadingCommentList,
  } = useApiRequest(commentsList);

  const loadMore = useCallback(async () => {
    if (commentListRes && lastCommentDate) {
      await listCommentApi({ args: { postId: _id, limit: 10, createdAt: lastCommentDate } });
    }
  }, [_id, commentListRes, lastCommentDate, listCommentApi]);

  const lastItem = useLoadMore(isLoadingCommentList, !!commentListRes?.length, loadMore);

  const handleCollapseClick = () => {
    setCollapsed(!collapse);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCommentCreate = async () => {
    const comment = await createCommentApi({
      args: { postId: _id, text: commentValue },
      successMessage: 'Comment created.',
    });

    setComments((prev) => [{ ...comment, user: me }, ...prev]);
    setOpenModal(false);
    setCommentValue('');
  };

  useEffect(() => {
    likeListApi({ args: _id });
    listCommentApi({ args: { postId: _id, limit: 10 } });
  }, [_id, likeListApi, listCommentApi]);

  useEffect(() => {
    if (!commentListRes) return;

    setComments((prev) => [...prev, ...commentListRes]);
    if (commentListRes.length)
      setLastCommentDate(commentListRes[commentListRes.length - 1].createdAt);
  }, [commentListRes]);

  useEffect(() => {
    if (!likeListRes) return;

    const { isMeLiked, likesCount } = likeListRes;

    setLiked(isMeLiked);
    setLikeCount(likesCount);
  }, [likeListRes]);

  useEffect(() => {
    if (!comments.length) return;
    const [lastComments, ...collapsedComments] = comments;
    setLastComment(lastComments);
    setCollapseComment(collapsedComments);
  }, [comments]);

  return (
    <>
      <Avatar
        src={photoSrc}
        alt={user.fullName}
        sx={{ width: 50, height: 50, alignSelf: 'flex-start', marginRight: '2%' }}
      />
      <Box sx={{ width: '50%' }}>
        <Box sx={{ background: '#F6F8FF', padding: '2%' }}>
          <Typography sx={{ wordBreak: 'break-word' }}>{text}</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            margin: '2% 0',
            background: '#F6F8FF',
            padding: '2%',
            borderRadius: '50px',
            justifyContent: 'space-between',
          }}
        >
          {isLoading ? (
            <Skeleton width={40} />
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="h6">{likeCount}</Typography>
              <Box
                sx={{ display: 'flex' }}
                onClick={() => {
                  setLikeApi({ args: _id });
                  setLiked((prev) => !prev);
                  if (liked) setLikeCount((count) => count - 1);
                  if (!liked) setLikeCount((count) => count + 1);
                }}
              >
                {liked ? <FavoriteIcon sx={{ color: colors.red[400] }} /> : <FavoriteBorderIcon />}
              </Box>
            </Box>
          )}
          <CommentButton onClick={handleOpenModal}>Comment</CommentButton>
        </Box>
        {!!comments.length && (
          <List sx={{ background: '#F6F8FF', margin: '5% 0' }}>
            {lastComment && (
              <>
                <Comment {...lastComment} />
                <ListItem onClick={handleCollapseClick}>
                  {collapse ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
              </>
            )}
            {!!collapseComment.length && (
              <Collapse in={collapse} timeout="auto" unmountOnExit>
                {collapseComment.map((comment, index) => (
                  <Box
                    ref={index + 1 === collapseComment.length ? lastItem : null}
                    key={comment._id}
                  >
                    <Comment {...comment} />
                  </Box>
                ))}
                {isLoadingCommentList && (
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                  </Box>
                )}
              </Collapse>
            )}
          </List>
        )}
      </Box>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
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
            placeholder="What is in your mind? ..."
            maxRows={10}
            autoComplete="off"
            rows={10}
            value={commentValue}
            fullWidth
            onChange={(e) => setCommentValue(e.target.value)}
          />
          <Button
            variant="contained"
            sx={{ width: '50%', marginTop: 2 }}
            onClick={handleCommentCreate}
          >
            Comment
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default Post;
