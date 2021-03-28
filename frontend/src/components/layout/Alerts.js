import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import AlertBox from './AlertBox';
// import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    position: 'absolute',
    // position: 'sticky',
    top: 200,
    left: 0,
    zIndex: 2000,
    // '& > * + *': {
    //   marginTop: theme.spacing(2)
    // }
  },
}));

function Alerts({ alerts }) {
  const classes = useStyles();

  return (
    <div id="alerts" className={classes.root}>
      {alerts !== null &&
        alerts.length > 0 &&
        alerts.map((alert) => (
          <AlertBox
            key={alert.id}
            severity={alert.type}
            title={alert.title}
            msg={alert.msg}
          />
        ))}
    </div>
  );
}

Alerts.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alerts);
