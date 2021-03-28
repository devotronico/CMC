import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

// import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: 'red',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

export default function OutlinedButtons() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h1" component="h2" gutterBottom>
        Errore 404
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        La pagina che cercavi non è stata trovata o non esiste
      </Typography>
      <Button variant="outlined" color="primary" href="/">
        Torna Alla Dashboard
      </Button>
    </div>
  );
}
