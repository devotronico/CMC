import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../../redux/auth/authActions';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  }
}));

const Logout = ({ logout }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h3" gutterBottom>
        Logout
      </Typography>
      <Button variant="contained" color="primary" onClick={() => logout()}>
        Logout
      </Button>
    </div>
  );
};

Logout.propTypes = {
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Logout);
