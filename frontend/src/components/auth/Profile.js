import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadUser, deleteAccount } from '../../redux/auth/authActions';

import Header from '../shared/Header';
import ProfileStats from './ProfileStats';
import ProfileDelete from './ProfileDelete';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    // backgroundColor: theme.palette.background.paper
  },
  card: {
    // backgroundColor: 'violet',
    padding: theme.spacing(2),
  },
  input: {
    width: 250,
    margin: theme.spacing(5, 0, 0, 2),
  },
  button: {
    width: 250,
    margin: theme.spacing(5, 0, 5, 2),
  },
}));

function Profile({ loadUser, deleteAccount, auth: { isAuthenticated, user } }) {
  const classes = useStyles();

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const onClickButton = () => {
    console.log('CLICK');
    deleteAccount();
  };

  return (
    <div className={classes.root}>
      <Header section={'Utente'} title={'Profilo'} subtitle={'Il mio Profilo'} />
      <Grid container justify="space-around" alignItems="stretch" spacing={4}>
        <Grid item xs={12} sm={12} md={6}>
          <ProfileStats
            card={classes.card}
            isAuthenticated={isAuthenticated}
            user={user}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <ProfileDelete
            card={classes.card}
            input={classes.input}
            button={classes.button}
            userEmail={user.email}
            onClickButton={onClickButton}
          />
        </Grid>
      </Grid>
    </div>
  );
}

Profile.propTypes = {
  loadUser: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loadUser, deleteAccount })(Profile);
