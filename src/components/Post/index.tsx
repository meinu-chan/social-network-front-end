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
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import React, { useState } from 'react';
import Comment from '../Comment';

const CommentButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText('#F6F8FF'),
}));

function Post() {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [collapse, setCollapsed] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [commentValue, setCommentValue] = useState('');

  const handleCollapseClick = () => {
    setCollapsed(!collapse);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Avatar sx={{ width: 50, height: 50, alignSelf: 'flex-start', marginRight: '2%' }} />
      <Box sx={{ width: '50%' }}>
        <Box sx={{ background: '#F6F8FF', padding: '2%' }}>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam urna sem, dapibus
            consectetur gravida in, fringilla sit amet ipsum. Integer sit amet venenatis massa.
            Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
            himenaeos. Nunc et erat vel augue pulvinar molestie et in erat. Fusce facilisis
            consequat.
          </Typography>
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
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6">{likeCount}</Typography>
            <Box
              sx={{ display: 'flex' }}
              onClick={() => {
                setLiked((prev) => !prev);
                if (liked) setLikeCount((count) => count - 1);
                if (!liked) setLikeCount((count) => count + 1);
              }}
            >
              {liked ? <FavoriteIcon sx={{ color: colors.red[400] }} /> : <FavoriteBorderIcon />}
            </Box>
          </Box>
          <CommentButton onClick={handleOpenModal}>Comment</CommentButton>
        </Box>
        <List sx={{ background: '#F6F8FF', margin: '5% 0' }}>
          <Comment />
          <ListItem onClick={handleCollapseClick}>
            {collapse ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={collapse} timeout="auto" unmountOnExit>
            <Comment />
            <Comment />
            <Comment />
          </Collapse>
        </List>
      </Box>
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
            onClick={handleCloseModal}
          >
            Comment
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default Post;
