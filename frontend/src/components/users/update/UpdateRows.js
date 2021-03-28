import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// import clsx from 'clsx';

import { connect } from 'react-redux';
import {
  updateSelectedUsers,
  deleteSelectedUsers,
} from '../../../redux/users/usersActions';

import UpdateGrid from './UpdateGrid';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

const useStyles = makeStyles((theme) => ({
  gridWrapper: {
    // backgroundColor: 'green',
    padding: 4,
    // width: 'auto',
    // overflow: 'hidden'
  },
}));

function UpdateRows({ selected, setSelected, updateSelectedUsers, deleteSelectedUsers }) {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState({
    username: '',
    age: '',
    role: '',
    register_at: '',
  });

  const handleChange = (prop) => (event) => {
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
    if (type) {
      updateSelectedUsers(selected, type, value);
    }
    setSelected([]);
  };

  // const handleDelete = () => {
  //   deleteSelectedUsers(selected);
  //   setSelected([]);
  // };

  const updateGrid = (
    <div id="update-grid" className={classes.gridWrapper}>
      <UpdateGrid
        values={values}
        handleChange={handleChange}
        handleUpdate={handleUpdate}
      />
    </div>
  );

  return (
    <div id="update">
      <Drawer variant="persistent" anchor="bottom" open={isOpen}>
        {updateGrid}
      </Drawer>
    </div>
  );
}

UpdateRows.propTypes = {
  selected: PropTypes.array.isRequired,
  setSelected: PropTypes.func.isRequired,
  updateSelectedUsers: PropTypes.func.isRequired,
  deleteSelectedUsers: PropTypes.func.isRequired,
};

export default connect(null, { updateSelectedUsers, deleteSelectedUsers })(UpdateRows);
