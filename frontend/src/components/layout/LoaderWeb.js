import React from 'react';
// import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    zIndex: 2000,
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  bg: {
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    opacity: 0.7,
  },
}));

export default function LoaderWeb() {
  // console.log('LoaderWeb');
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.bg}>
        <CircularProgress />
        <Typography variant="subtitle1" gutterBottom align="center">
          ATTENDERE COSTRUZIONE PAGINA
        </Typography>
      </div>
    </div>
  );
}
