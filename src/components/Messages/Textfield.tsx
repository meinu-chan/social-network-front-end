import React, { useState } from 'react';
import { Grid, TextField, Fab, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { createMessageApi } from '../../api/message';
import { IMessage } from '../../types/Message';

interface IProps {
  chatId: string;
  handleSending: (message: IMessage) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: '2%',
  },
  lateralIcons: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
}));

function Textfield({ chatId, handleSending }: IProps) {
  const classes = useStyles();
  const [text, setText] = useState('');

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const message = await createMessageApi({ chatId, payload: { text } });

    handleSending(message);

    setText('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    e.preventDefault();

    setText(e.target.value);
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={1} className={classes.lateralIcons}>
        <Fab color="primary" disabled>
          <AttachFileIcon />
        </Fab>
      </Grid>
      <Grid item xs={10}>
        <TextField
          fullWidth
          multiline
          maxRows={4}
          value={text}
          inputProps={{ maxLength: 2000 }}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={1} className={classes.lateralIcons}>
        <Fab color="primary" onClick={handleClick}>
          <SendIcon />
        </Fab>
      </Grid>
    </Grid>
  );
}

export default Textfield;
