import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& input + fieldset': {
      borderRadius: 0,
    },
  },
}));

export default function Title({ title, setTitle }) {
  const classes = useStyles();

  return (
    <TextField
      id="title"
      variant="outlined"
      placeholder="Titolo del Post"
      className={classes.root}
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
  );
}
