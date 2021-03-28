import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { readUsers } from '../../redux/users/usersActions';

import ListHeader from './ListHeader';
import MyTable from './table/MyTable';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: 'pink',
    width: '100%',
    height: '100%'
  },
  btnDelete: {
    marginTop: 30,
    minWidth: 200
  }
}));

function UsersList({ readUsers, users }) {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [jsonRows, setJsonRows] = useState('');

  useEffect(() => {
    readUsers();
  }, [readUsers]);

  useEffect(() => {
    if (users.length > 0) {
      setRows(users);
      setJsonRows(JSON.stringify(users));
      console.log('TEST: ', users);
    }
  }, [users]);

  return (
    <div className={classes.root}>
      <ListHeader jsonRows={jsonRows} setRows={setRows} />
      <MyTable rows={rows} />
    </div>
  );
}

UsersList.propTypes = {
  readUsers: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  users: state.users.users
});

export default connect(mapStateToProps, { readUsers })(UsersList);
