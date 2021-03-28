import React from 'react';
import Search from './Search';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#f4f6f8',
    padding: theme.spacing(3)
  },
  head: {
    width: '100%',
    textAlign: 'left',
    color: 'red',
    marginBottom: 20,
    '& span': {
      color: '#546e7a',
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: '0.33px'
    },
    '& h3': {
      color: '#263238',
      fontSize: '24px'
    },
    '& h6': {
      color: '#263238',
      lineHeight: '25px'
    }
  }
}));

export default function Head() {
  const classes = useStyles();

  return (
    <div className={classes.head}>
      <Typography variant="overline" display="block" gutterBottom>
        UTENTI
      </Typography>
      <Typography variant="h3" gutterBottom>
        Lista degli Utenti
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        visualizza / filtra / modifica / cancella
      </Typography>
      <Search />
      {/* <Divider /> */}
    </div>
  );
}
