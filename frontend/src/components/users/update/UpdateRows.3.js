import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import {
  updateSelectedUsers,
  deleteSelectedUsers
} from '../../../redux/users/usersActions';

import UpdateGrid from './UpdateGrid';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

const useStyles = makeStyles(theme => ({}));

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
    role: '',
    data: ''
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
    if (type && value) {
      updateSelectedUsers(selected, type, value);
    }
    setSelected([]);
  };

  // const handleDelete = () => {
  //   deleteSelectedUsers(selected);
  //   setSelected([]);
  // };

  const list = (
    <div className={classes.list}>
      <UpdateGrid
        values={values}
        handleChange={handleChange}
        handleUpdate={handleUpdate}
        // handleDelete={handleDelete}
      />
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
