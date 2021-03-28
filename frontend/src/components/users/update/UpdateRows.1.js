import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import {
  updateSelectedUsers,
  deleteSelectedUsers
} from '../../../redux/users/usersActions';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';

import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles({
  list: {
    width: 'auto'
  }
});

function UpdateRows({
  selected,
  setSelected,
  updateSelectedUsers,
  deleteSelectedUsers
}) {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

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

  const handleOnClickUpdate = (event, type, value) => {
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
    <div className={classes.list}>
      <Typography>Online</Typography>
      <Tooltip title="Attiva">
        <IconButton
          aria-label="attiva"
          onClick={event => handleOnClickUpdate(event, 'isAuthenticated', 1)}
        >
          <CheckCircleIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Disattiva">
        <IconButton
          aria-label="disattiva"
          onClick={event => handleOnClickUpdate(event, 'isAuthenticated', 0)}
        >
          <CancelIcon />
        </IconButton>
      </Tooltip>
      <Divider orientation="vertical" flexItem className={classes.divider} />
      <Tooltip title="Delete">
        <IconButton aria-label="delete" onClick={handleOnClickDelete}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
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
