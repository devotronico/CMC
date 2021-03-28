import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../redux/auth/authActions';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: 'green',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  card: {
    // backgroundColor: 'violet',
    width: 300,
    minWidth: 300,
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const Logout = ({ logout, history }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <Typography variant="h5" gutterBottom>
          Logout
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => logout(history)}
        >
          Logout
        </Button>
      </Card>
    </div>
  );
};

Logout.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default connect(null, { logout })(Logout);
