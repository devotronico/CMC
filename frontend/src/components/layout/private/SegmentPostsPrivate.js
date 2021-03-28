import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import IconBlog from '@material-ui/icons/MenuBook';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(0),
  },
  nested: {
    paddingLeft: theme.spacing(10),
  },
}));

export default function SegmentPostsPrivate() {
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
          <IconBlog />
        </ListItemIcon>
        <ListItemText primary="Blog" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem component={Link} to="/posts" className={classes.nested}>
            <ListItemText primary="Articoli" />
          </ListItem>
          {/* <ListItem component={Link} to="/post/1" className={classes.nested}>
            <ListItemText primary="Articolo 1" />
          </ListItem> */}
          <ListItem
            component={Link}
            to="/post/create"
            className={classes.nested}
          >
            <ListItemText primary="Crea Articolo" />
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
}
