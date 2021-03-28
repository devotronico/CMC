import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import {
  updateSelectedUsers,
  deleteSelectedUsers
} from '../../../redux/users/usersActions';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FilledInput from '@material-ui/core/FilledInput';
import InputAdornment from '@material-ui/core/InputAdornment';

// import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

import Typography from '@material-ui/core/Typography';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    display: 'none'
  },
  center: {
    // width: '100%',
    // backgroundColor: "red",
    // border: "1px solid black",
    textAlign: 'center'
    // borderRadius: 0
  },
  text: {
    // display: "inline-block"
  },
  role: {
    // backgroundColor: "blue",
    // margin: 20,
    display: 'flex',
    alignItems: 'center'
  },
  roleLabel: {
    // backgroundColor: "red",
    lineHeight: 0.2
  },
  roleSelect: {
    // backgroundColor: "yellow",
    padding: '12px 26px 10px 12px'
  }
}));

function UpdateRows({
  selected,
  setSelected,
  updateSelectedUsers,
  deleteSelectedUsers
}) {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState({
    name: '',
    age: '',
    role: ''
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  useEffect(() => {
    if (selected.length > 0) {
      if (!isOpen) {
        setIsOpen(true);
      }
    } else {
      if (isOpen) {
        setIsOpen(false);
      }
    }
  }, [selected]);

  const handleUpdate = (event, type, value) => {
    console.log('TYPE', type);
    console.log('VALUE', value);

    updateSelectedUsers(selected, type, value);
    setSelected([]);
  };

  const handleOnClickDelete = () => {
    deleteSelectedUsers(selected);
    setSelected([]);
  };

  const list = (
    <div className={classes.root}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={1}
      >
        <Grid item xs={12} sm={6} md={3} lg={1}>
          <Paper className={classes.paper}>ITEM 1</Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={1}>
          <Paper className={classes.paper}>ITEM 2</Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={1}>
          <Paper className={classes.paper}>ITEM 3</Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={1}>
          <Paper className={classes.paper}>ITEM 4</Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={1}>
          <Paper className={classes.paper}>ITEM 5</Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={1}>
          <Paper className={classes.paper}>ITEM 6</Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={1} className={classes.center}>
          <FormControl variant="filled">
            <InputLabel htmlFor="update-name">NOME</InputLabel>
            <FilledInput
              id="update-name"
              type="text"
              value={values.name}
              onChange={handleChange('name')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="update name"
                    onClick={event => handleUpdate(event, 'name', values.name)}
                    edge="end"
                  >
                    <CheckCircleIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={1} className={classes.center}>
          <FormControl variant="filled">
            <InputLabel htmlFor="update-age">ANNI</InputLabel>
            <FilledInput
              id="update-age"
              type="number"
              value={values.age}
              onChange={handleChange('age')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="update age"
                    onClick={event => handleUpdate(event, 'age', values.age)}
                    edge="end"
                  >
                    <CheckCircleIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={3} lg={1} className={classes.center}>
          <div className={classes.role}>
            <FormControl variant="outlined">
              <InputLabel htmlFor="update-role" className={classes.roleLabel}>
                Ruolo
              </InputLabel>
              <Select
                classes={{
                  select: classes.roleSelect
                }}
                native
                value={values.role}
                onChange={handleChange('role')}
                labelWidth={40}
                inputProps={{
                  name: 'role',
                  id: 'update-role'
                }}
              >
                <option value="" />
                <option value="system">System</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </Select>
            </FormControl>
            <Tooltip title="Attiva">
              <IconButton
                aria-label="attiva"
                onClick={event => handleUpdate(event, 'role', values.role)}
              >
                <CheckCircleIcon />
              </IconButton>
            </Tooltip>
          </div>
        </Grid>

        <Grid item xs={12} sm={6} md={3} lg={1} className={classes.center}>
          <>
            <Typography
              variant="caption"
              display="block"
              className={classes.text}
            >
              Online
            </Typography>
            <Tooltip title="Attiva">
              <IconButton
                aria-label="attiva"
                onClick={event => handleUpdate(event, 'isAuthenticated', 1)}
              >
                <CheckCircleIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Disattiva">
              <IconButton
                aria-label="disattiva"
                onClick={event => handleUpdate(event, 'isAuthenticated', 0)}
              >
                <CancelIcon />
              </IconButton>
            </Tooltip>
          </>
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={1} className={classes.center}>
          <>
            <Typography className={classes.text}>Online</Typography>
            <Tooltip title="Attiva">
              <IconButton
                aria-label="attiva"
                onClick={event => handleUpdate(event, 'isAuthenticated', 1)}
              >
                <CheckCircleIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Disattiva">
              <IconButton
                aria-label="disattiva"
                onClick={event => handleUpdate(event, 'isAuthenticated', 0)}
              >
                <CancelIcon />
              </IconButton>
            </Tooltip>
          </>
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={1} className={classes.center}>
          <Tooltip title="Delete">
            <IconButton aria-label="delete" onClick={handleOnClickDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </div>
  );

  return (
    <div>
      <React.Fragment>
        <Drawer variant="persistent" anchor="bottom" open={isOpen}>
          {list}
        </Drawer>
      </React.Fragment>
    </div>
  );
}

UpdateRows.propTypes = {
  selected: PropTypes.array.isRequired,
  setSelected: PropTypes.func.isRequired,
  updateSelectedUsers: PropTypes.func.isRequired,
  deleteSelectedUsers: PropTypes.func.isRequired
};

export default connect(null, { updateSelectedUsers, deleteSelectedUsers })(
  UpdateRows
);
