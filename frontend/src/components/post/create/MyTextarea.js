import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    // height: '100%',
    // backgroundColor: "green",
    '& > div': {
      // backgroundColor: "blue",
      // height: '100%',
    },
    '& textarea + fieldset': {
      // backgroundColor: "orange",
      // height: '100%',
      borderRadius: 0,
      // backgroundColor: "pink",
      // borderColor: "green",
      // borderWidth: 6,
      padding: '6px !important'
    },
    '& textarea:hover + fieldset': {
      // borderColor: "red !important",
      // borderWidth: 6,
      padding: '6px !important'
    },
    '& textarea:focus + fieldset': {
      // backgroundColor: "green",
      // borderColor: "green !important",
      // borderWidth: "6px !important",
      padding: '6px !important'
    },
    '& textarea:active + fieldset': {
      // backgroundColor: "green",
      // borderColor: "blue important",
      // borderWidth: 6,
      padding: '6px !important'
    }
  }
}));

export default function MyTextarea({ text, setText }) {
  const classes = useStyles();
  return (
    <TextField
      id="textarea"
      className={classes.root}
      // label="Multiline"
      placeholder="Scrivere in questa area"
      multiline
      rows="20"
      // defaultValue="Default Value"
      variant="outlined"
      value={text}
      onChange={e => setText(e.target.value)}
    />
  );
}
