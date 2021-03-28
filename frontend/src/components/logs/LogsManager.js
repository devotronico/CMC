import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// import { device } from '../layout/Container';

import { connect } from 'react-redux';
import {
  readLogs,
  createFakeLogs,
  deleteFakeLogs
} from '../../redux/logs/logsActions';

import Header from '../shared/Header';
import Stats from './manage/Stats';
import Add from './manage/Add';
import Delete from './manage/Delete';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'silver',
    width: '100%',
    height: '100%'
  }
}));

function LogsManager({ readLogs, createFakeLogs, deleteFakeLogs, logs }) {
  // const device = useContext(Device);
  // console.log('TEST: ', device);
  const classes = useStyles();

  useEffect(() => {
    readLogs();
  }, [readLogs]);

  return (
    <div className={classes.root}>
      <Header
        section={'LOGS'}
        title={'Crea o cancella i Log'}
        subtitle={'Lorem ipsum dolor sit amet'}
      />
      <Grid container justify="space-around" alignItems="stretch" spacing={1}>
        <Grid item xs={12} sm={6} md={3}>
          <Stats logs={logs} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Add readLogs={readLogs} createFakeLogs={createFakeLogs} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Delete readLogs={readLogs} deleteFakeLogs={deleteFakeLogs} />
        </Grid>
      </Grid>
    </div>
  );
}

LogsManager.propTypes = {
  readLogs: PropTypes.func.isRequired,
  createFakeLogs: PropTypes.func.isRequired,
  deleteFakeLogs: PropTypes.func.isRequired,
  logs: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  logs: state.logs.logs
});

export default connect(mapStateToProps, {
  readLogs,
  createFakeLogs,
  deleteFakeLogs
})(LogsManager);
