import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  updateSelectedUsers,
  deleteSelectedUsers,
} from '../../../redux/users/usersActions';

import { lighten, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
// import Divider from '@material-ui/core/Divider';
// import CheckCircleIcon from '@material-ui/icons/CheckCircle';
// import CancelIcon from '@material-ui/icons/Cancel';

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
  divider: {
    margin: theme.spacing(1, 1),
  },
  // textField: {
  //   width: 100
  // }
}));

const MyTableToolbar = ({
  selected,
  setSelected,
  updateSelectedUsers,
  deleteSelectedUsers,
}) => {
  const classes = useToolbarStyles();
  const numSelected = selected.length;

  /*   const handleOnClickUpdate = (event, type, value) => {
    updateSelectedUsers(selected, type, value);
    setSelected([]);
  }; */

  const handleOnClickDelete = () => {
    deleteSelectedUsers(selected);
    setSelected([]);
  };

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle">
          Users
        </Typography>
      )}

      {numSelected > 0 ? (
        <>
          {/* <Divider
            orientation="vertical"
            flexItem
            className={classes.divider}
          />
          <TextField
            id="age"
            label="ANNI"
            type="number"
            InputLabelProps={{
              shrink: true
            }}
            variant="filled"
          />
          <Divider
            orientation="vertical"
            flexItem
            className={classes.divider}
          />

          <Typography>Online</Typography>

          <Tooltip title="Delete">
            <IconButton
              aria-label="delete"
              onClick={event =>
                handleOnClickUpdate(event, 'isAuthenticated', 1)
              }
            >
              <CheckCircleIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              aria-label="delete"
              onClick={event =>
                handleOnClickUpdate(event, 'isAuthenticated', 0)
              }
            >
              <CancelIcon />
            </IconButton>
          </Tooltip>
          <Divider
            orientation="vertical"
            flexItem
            className={classes.divider}
          /> */}
          <Tooltip title="Delete">
            <IconButton aria-label="delete" onClick={handleOnClickDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

MyTableToolbar.propTypes = {
  selected: PropTypes.array.isRequired,
  setSelected: PropTypes.func.isRequired,
  updateSelectedUsers: PropTypes.func.isRequired,
  deleteSelectedUsers: PropTypes.func.isRequired,
};

export default connect(null, { updateSelectedUsers, deleteSelectedUsers })(
  MyTableToolbar
);
