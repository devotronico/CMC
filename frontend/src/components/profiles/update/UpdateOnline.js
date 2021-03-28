import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const useStyles = makeStyles(theme => ({
  text: {
    display: 'block',
    position: 'relative',
    top: 10
    // width: "100%"
  }
}));

export default function UpdateOnline({ handleUpdate }) {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="caption" display="block" className={classes.text}>
        Online2
      </Typography>
      <Tooltip title="Attiva">
        <IconButton
          aria-label="attiva"
          onClick={event => handleUpdate(event, 'isAuthenticated', 1)}
        >
          <CheckCircleIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Disattiva">
        <IconButton
          aria-label="disattiva"
          onClick={event => handleUpdate(event, 'isAuthenticated', 0)}
        >
          <CancelIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
}
