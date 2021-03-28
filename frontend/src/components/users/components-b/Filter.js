import React from 'react';

import FilterPanel from './FilterPanel';

import { makeStyles } from '@material-ui/core/styles';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import FilterListIcon from '@material-ui/icons/FilterList';
import CloseIcon from '@material-ui/icons/Close';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(theme => ({
  root: {
    width: 420,
    '& > *': {
      margin: theme.spacing(1)
    }
  }
}));

export default function Filter() {
  const classes = useStyles();
  const [state, setState] = React.useState(false);

  const toggleDrawer = open => event => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    const idButton = event.target.id;
    const id = event.target.parentElement.id;
    const cls = event.target.className;
    const idIcon = event.target.parentElement.parentElement.parentElement.id;

    if (
      idButton === 'btn-filter' ||
      id === 'btn-filter' ||
      idIcon === 'btn-filter' ||
      cls === 'MuiBackdrop-root'
    ) {
      setState(open);
    }
  };

  const sideList = () => (
    <div
      id="test"
      className={classes.root}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Button id="btn-filter" startIcon={<CloseIcon />}>
        close
      </Button>
      <FilterPanel />

      <List>
        <ListItem button>
          <ListItemText primary="ITEM A" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="ITEM B" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <Button
        id="btn-filter"
        variant="outlined"
        color="primary"
        startIcon={<FilterListIcon />}
        onClick={toggleDrawer(true)}
      >
        Show filters
      </Button>

      <SwipeableDrawer
        anchor="right"
        open={state}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {sideList()}
      </SwipeableDrawer>
    </div>
  );
}
