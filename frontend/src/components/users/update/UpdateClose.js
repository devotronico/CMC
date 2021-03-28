import React from 'react';

// import { makeStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

// const useStyles = makeStyles(theme => ({}));

export default function UpdateClose({ handleUpdate }) {
  //   const classes = useStyles();

  return (
    <IconButton
      aria-label="delete"
      onClick={event => handleUpdate(event, '', '')}
    >
      <CloseIcon />
    </IconButton>
  );
}
