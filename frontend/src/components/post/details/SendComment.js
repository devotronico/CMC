import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';

import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import SendIcon from '@material-ui/icons/Send';
import ImageIcon from '@material-ui/icons/Image';
import AttachFileIcon from '@material-ui/icons/AttachFile';

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: "yellow",
    display: 'flex',
    alignItems: 'center',
    padding: 16
  },
  paper: {
    // backgroundColor: "red",
    padding: '4px 16px',
    flexGrow: 1,
    marginLeft: 16
  },
  input: {
    // backgroundColor: "blue",
    width: '100%'
  },
  iconButton: {
    // backgroundColor: "green",
  },
  divider: {
    width: 1,
    height: 24
  }
}));

export default function SendComment({ avatar, sendComment }) {
  const classes = useStyles();

  const [value, setValue] = useState('');

  const handleOnChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div id="comment-send" className={classes.root}>
      <Avatar alt={avatar} src={avatar} />
      <Paper className={classes.paper}>
        <InputBase
          value={value}
          className={classes.input}
          placeholder="Write a Comment"
          inputProps={{ 'aria-label': 'search' }}
          onChange={handleOnChange}
        />
      </Paper>
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="send-comment"
        onClick={() => {
          sendComment(value);
          setValue('');
        }}
      >
        <SendIcon />
      </IconButton>

      <Divider orientation="vertical" className={classes.divider} />

      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="attach-image"
        // onClick={createComment}
      >
        <ImageIcon />
      </IconButton>
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="attach-file"
        // onClick={createComment}
      >
        <AttachFileIcon />
      </IconButton>
    </div>
  );
}
