import React from 'react';

import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2)
    // color: theme.palette.text.secondary
  },
  statsTitle: { textAlign: 'center' }
}));

export default function Stats({ users }) {
  const classes = useStyles();

  const fakeUsers = users.filter(user => user.isFake).length;
  const trueUsers = users.filter(user => !user.isFake).length;
  const totalUsers = users.length;
  const isActive = users.filter(item => item.isActive === true).length;
  const isAuthenticated = users.filter(item => item.isAuthenticated === true)
    .length;
  const system = users.filter(item => item.role === 'system').length;
  const admin = users.filter(item => item.role === 'admin').length;
  const user = users.filter(item => item.role === 'user').length;

  return (
    <Paper className={classes.paper}>
      <Typography variant="h6" className={classes.statsTitle}>
        Statistiche dei User
      </Typography>
      <List subheader={<ListSubheader>Numero di User</ListSubheader>}>
        <ListItem>
          <ListItemText primary="Numero dei User veri" />
          <Typography variant="body1">{trueUsers}</Typography>
        </ListItem>
        <ListItem>
          <ListItemText primary="Numero dei User finti" />
          <Typography variant="body1">{fakeUsers}</Typography>
        </ListItem>
        <ListItem>
          <ListItemText primary="Numero totale dei User" />
          <Typography variant="body1">{totalUsers}</Typography>
        </ListItem>
        <Divider />
        <ListSubheader>Altre informazioni</ListSubheader>
        <ListItem>
          <ListItemText primary="isActive" />
          <Typography variant="body1">{isActive}</Typography>
        </ListItem>
        <ListItem>
          <ListItemText primary="isAuthenticated" />
          <Typography variant="body1">{isAuthenticated}</Typography>
        </ListItem>
        <ListItem>
          <ListItemText primary="system" />
          <Typography variant="body1">{system}</Typography>
        </ListItem>
        <ListItem>
          <ListItemText primary="admin" />
          <Typography variant="body1">{admin}</Typography>
        </ListItem>
        <ListItem>
          <ListItemText primary="user" />
          <Typography variant="body1">{user}</Typography>
        </ListItem>
      </List>
    </Paper>
  );
}
