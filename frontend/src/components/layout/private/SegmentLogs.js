import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import IconLogs from '@material-ui/icons/List';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    // backgroundColor: 'red',
    padding: theme.spacing(0),
  },
  nested: {
    paddingLeft: theme.spacing(10),
  },
}));

export default function SegmentLogs() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <IconLogs />
        </ListItemIcon>
        <ListItemText primary="Logs" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem component={Link} to="/logs" className={classes.nested}>
            <ListItemText primary="Lista Logs" />
          </ListItem>
          <ListItem
            component={Link}
            to="/logs/manager"
            className={classes.nested}
          >
            <ListItemText primary="Gestione Log" />
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
}
