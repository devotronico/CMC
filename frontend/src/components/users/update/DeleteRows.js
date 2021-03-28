import React from 'react';

// import { makeStyles } from "@material-ui/core/styles";
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

// const useStyles = makeStyles(theme => ({}));

export default function DeleteRows({ handleDelete }) {
  //   const classes = useStyles();

  return (
    <Tooltip title="Delete">
      <IconButton aria-label="delete" onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
}
