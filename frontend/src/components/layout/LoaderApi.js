import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    zIndex: 2000,
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  bg: {
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    opacity: 0.7,
  },
}));

function LoaderApi({ isLoading }) {
  // console.log('LoaderApi', isLoading);
  const classes = useStyles();

  return (
    <div id="loader-api" className={classes.root}>
      {isLoading && (
        <div className={classes.bg}>
          <CircularProgress />
          <Typography variant="subtitle1" gutterBottom align="center">
            ATTENDERE RISPOSTA DEL SERVER
          </Typography>
        </div>
      )}
    </div>
  );
}

LoaderApi.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: state.loader.isLoading,
});

export default connect(mapStateToProps)(LoaderApi);
