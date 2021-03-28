import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendNotify } from '../../redux/notify/notifyActions';

import Header from '../shared/Header';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    // backgroundColor: 'orange',
    width: '100%',
    height: '100%'
  },
  body: {
    // backgroundColor: 'pink',
    display: 'flex',
    justifyContent: 'center'
  },
  paper: {
    // backgroundColor: 'green',
    padding: theme.spacing(2)
  }
}));

const Dashboard = ({ sendNotify }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header
        section={'Dashboard'}
        title={'Controlla la tua Dashboard'}
        subtitle={'informazioni generali sui dati memorizzati'}
      />
      <div className={classes.body}>
        <Paper className={classes.paper}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => sendNotify()}
          >
            Invia Push Notification
          </Button>
        </Paper>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  sendNotify: PropTypes.func.isRequired
};

// const mapStateToProps = state => ({
//   isAuthenticated: state.auth.isAuthenticated
// });

export default connect(null, { sendNotify })(Dashboard);
