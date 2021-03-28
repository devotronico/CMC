import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import {
  readUsers,
  createFakeUsers,
  deleteFakeUsers
} from '../../redux/users/usersActions';

import Header from '../shared/Header';
import Stats from './manage/Stats';
import Add from './manage/Add';
import Delete from './manage/Delete';

import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    // backgroundColor: 'pink',
    width: '100%',
    height: '100%'
    // padding: theme.spacing(3)
  }
}));

function UsersManager({ readUsers, createFakeUsers, deleteFakeUsers, users }) {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:600px)');
  const device = matches ? 'desktop' : 'mobile';

  useEffect(() => {
    readUsers();
  }, [readUsers]);

  return (
    <div className={clsx(classes.root, classes[device])}>
      <Header
        section={'Utente'}
        title={'Gestire Utenti'}
        subtitle={'Statistiche - Creazione - Cancellazione'}
      />
      <Grid container justify="space-around" alignItems="stretch" spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Stats users={users} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Add readUsers={readUsers} createFakeUsers={createFakeUsers} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Delete readUsers={readUsers} deleteFakeUsers={deleteFakeUsers} />
        </Grid>
      </Grid>
    </div>
  );
}

UsersManager.propTypes = {
  readUsers: PropTypes.func.isRequired,
  createFakeUsers: PropTypes.func.isRequired,
  deleteFakeUsers: PropTypes.func.isRequired,
  users: PropTypes.array
};

const mapStateToProps = state => ({
  users: state.users.users
});

export default connect(mapStateToProps, {
  readUsers,
  createFakeUsers,
  deleteFakeUsers
})(UsersManager);
