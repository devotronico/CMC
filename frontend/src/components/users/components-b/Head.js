import React from 'react';
import Search from './Search';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Filter from './Filter';

const useStyles = makeStyles(theme => ({
  root: { marginBottom: 30 },
  head: {
    '& span': {
      color: '#546e7a',
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: '0.33px'
    },
    '& h3': {
      color: '#263238',
      fontSize: '24px',
      fontWeight: 600,
      lineHeight: '28px',
      letterSpacing: -0.06,
      marginBottom: 0
    }
  }
}));

export default function Head() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3} justify="space-between" alignItems="flex-end">
        <Grid item>
          <div className={classes.head}>
            <Typography variant="overline" display="block" gutterBottom>
              UTENTI
            </Typography>
            <Typography variant="h3" gutterBottom>
              Lista degli Utenti
            </Typography>
          </div>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary">
            Aggiungi Utente
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={3} justify="space-between" alignItems="flex-end">
        <Grid item>
          <Search />
        </Grid>
        <Grid item>
          <Filter />
        </Grid>
      </Grid>
    </div>
  );
}
