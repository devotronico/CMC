import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import IconUsers from '@material-ui/icons/Group';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    // backgroundColor: 'red',
    padding: theme.spacing(0)
  },
  nested: {
    paddingLeft: theme.spacing(8),
    '& span': {
      fontSize: 14
    }
  }
}));

export default function SegmentProfilePrivate() {
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
          <IconUsers />
        </ListItemIcon>
        <ListItemText primary="Profili" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem component={Link} to="/profiles" className={classes.nested}>
            <ListItemText primary="Lista Profili" />
          </ListItem>
          <ListItem
            component={Link}
            to="/profiles/manager"
            className={classes.nested}
          >
            <ListItemText primary="Gestione Profili" />
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
}
