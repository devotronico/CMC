import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
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
    width: 105,
    marginLeft: theme.spacing(0)
  },
  iconButton: {
    padding: 10
  },
  button: {
    marginLeft: 4,
    paddingLeft: 4,
    paddingRight: 4
  }
}));

export default function Search({ jsonRows, setRows }) {
  const classes = useStyles();

  const [value, setValue] = useState('');

  /// FILTER BY NAME
  const filterByUsername = (obj, username) => {
    return username
      ? obj.filter((row) => {
          return RegExp(username, 'gi').test(row.username);
        })
      : obj;
  };

  const handleOnChange = (e) => {
    setValue(e.target.value);
  };

  const onClickFilterUsername = (e) => {
    let rows = JSON.parse(jsonRows);
    rows = value ? filterByUsername(rows, value) : rows;
    setRows(rows);
  };

  const handleOnClickReset = () => {
    setRows(JSON.parse(jsonRows));
    setValue('');
  };

  return (
    <div id="search" className={classes.root}>
      <Paper component="form" className={classes.paper}>
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
        <InputBase
          value={value}
          className={classes.input}
          placeholder="Search"
          inputProps={{ 'aria-label': 'search' }}
          onChange={handleOnChange}
        />
      </Paper>
      <Button
        variant="outlined"
        color="primary"
        className={classes.button}
        onClick={onClickFilterUsername}
      >
        Search
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        className={classes.button}
        onClick={handleOnClickReset}
      >
        reset
      </Button>
    </div>
  );
}
