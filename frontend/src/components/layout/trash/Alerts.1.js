import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    position: 'absolute',
    top: '200px',
    zIndex: 1000,
    '& > * + *': {
      marginTop: theme.spacing(2)
    }
  }
}));

function Alerts({ alerts }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {alerts !== null &&
        alerts.length > 0 &&
        alerts.map(alert => (
          <Alert key={alert.id} severity={alert.type} variant="filled">
            <AlertTitle>{alert.title}</AlertTitle>
            {alert.msg}
          </Alert>
        ))}
    </div>
  );
}

Alerts.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alerts);
