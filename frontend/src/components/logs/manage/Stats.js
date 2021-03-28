import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2)
    // color: theme.palette.text.secondary
  },
  statsTitle: { textAlign: 'center' }
}));

export default function Stats({ logs }) {
  const classes = useStyles();

  const fakeLogs = logs.filter(log => log.isFake).length;
  const trueLogs = logs.filter(log => !log.isFake).length;
  const totalLogs = logs.length;
  const GET = logs.filter(item => item.method === 'GET').length;
  const POST = logs.filter(item => item.method === 'POST').length;
  const PUT = logs.filter(item => item.method === 'PUT').length;
  const DELETE = logs.filter(item => item.method === 'DELETE').length;

  return (
    <Paper className={classes.paper}>
      <Typography variant="h6" className={classes.statsTitle}>
        Statistiche dei Log
      </Typography>
      <List subheader={<ListSubheader>Numero di Log</ListSubheader>}>
        <ListItem>
          <ListItemText primary="Numero dei Log veri" />
          <Typography variant="body1">{trueLogs}</Typography>
        </ListItem>
        <ListItem>
          <ListItemText primary="Numero dei Log finti" />
          <Typography variant="body1">{fakeLogs}</Typography>
        </ListItem>
        <ListItem>
          <ListItemText primary="Numero totale dei Log" />
          <Typography variant="body1">{totalLogs}</Typography>
        </ListItem>
        <Divider />
        <ListSubheader>Numero totale per ogni metodo</ListSubheader>
        <ListItem>
          <ListItemText primary="GET" />
          <Typography variant="body1">{GET}</Typography>
        </ListItem>
        <ListItem>
          <ListItemText primary="POST" />
          <Typography variant="body1">{POST}</Typography>
        </ListItem>
        <ListItem>
          <ListItemText primary="PUT" />
          <Typography variant="body1">{PUT}</Typography>
        </ListItem>
        <ListItem>
          <ListItemText primary="DELETE" />
          <Typography variant="body1">{DELETE}</Typography>
        </ListItem>
      </List>
    </Paper>
  );
}
