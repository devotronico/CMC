import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    height: 42,
    display: 'flex',
    justifyContent: 'space-between',
    minWidth: 270
  },
  paper: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  buttonSearch: {
    marginLeft: 20
  }
}));

export default function Search() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper component="form" className={classes.paper}>
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
        <InputBase
          className={classes.input}
          placeholder="Search"
          inputProps={{ 'aria-label': 'search' }}
        />
      </Paper>
      <Button
        variant="outlined"
        color="primary"
        className={classes.buttonSearch}
      >
        Cerca
      </Button>
    </div>
  );
}
