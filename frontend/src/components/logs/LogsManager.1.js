import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import { Test } from '../layout/Container';

import { connect } from 'react-redux';
import {
  readLogs,
  createFakeLogs,
  deleteFakeLogs
} from '../../redux/logs/logsActions';

import LoadingData from '../shared/LoadingData';
import Header from '../shared/Header';
import Stats from './create/Stats';
import Add from './create/Add';
import Delete from './create/Delete';

import clsx from 'clsx';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'pink',
    width: '100%',
    height: '100%',
    padding: theme.spacing(3)
  },
  desktop: {
    // backgroundColor: 'red',
    padding: theme.spacing(3)
  },
  mobile: {
    // backgroundColor: 'yellow',
    padding: theme.spacing(0)
  }
}));

function LogsManager({
  isLoading,
  readLogs,
  createFakeLogs,
  deleteFakeLogs,
  logs
}) {
  const test = useContext(Test);
  console.log('TEST: ', test);
  const matches = useMediaQuery('(min-width:600px)');
  const device = matches ? 'desktop' : 'mobile';
  const classes = useStyles();

  useEffect(() => {
    readLogs();
  }, [readLogs]);

  return (
    <div className={clsx(classes.root, classes[device])}>
      {isLoading ? (
        <LoadingData />
      ) : (
        <>
          <Header
            section={'LOGS'}
            title={'Crea o cancella i Log'}
            subtitle={'Lorem ipsum dolor sit amet'}
          />
          <Grid
            container
            justify="space-around"
            alignItems="stretch"
            spacing={1}
          >
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
        </>
      )}
    </div>
  );
}

LogsManager.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  readLogs: PropTypes.func.isRequired,
  createFakeLogs: PropTypes.func.isRequired,
  deleteFakeLogs: PropTypes.func.isRequired,
  logs: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  isLoading: state.loader.isLoading,
  logs: state.logs.logs
});

export default connect(mapStateToProps, {
  readLogs,
  createFakeLogs,
  deleteFakeLogs
})(LogsManager);
