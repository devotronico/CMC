import React from 'react';

import Header from '../shared/Header';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'orange',
    width: '100%',
    height: '100%'
  },
  body: {
    // backgroundColor: 'pink',
    display: 'flex',
    justifyContent: 'center'
  },
  paper: {
    // backgroundColor: 'green',
    padding: theme.spacing(2)
  }
}));

export default function Settings() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header
        section={'Settings'}
        title={'Controlla i settaggi'}
        subtitle={'informazioni generali sui settaggi memorizzati'}
      />
      <div className={classes.body}>
        <Paper className={classes.paper}>
          <Button variant="contained" color="primary">
            Invia
          </Button>
        </Paper>
      </div>
    </div>
  );
}
