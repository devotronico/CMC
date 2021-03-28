import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    top: 0,
    left: 80,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'red',
    opacity: 0.5
  }
}));

// const useStyles = makeStyles(theme => ({
//   root: {
//     display: 'flex',
//     '& > * + *': {
//       marginLeft: theme.spacing(2)
//     }
//   }
// }));

function Loader({ isLoading }) {
  console.log('Loader', isLoading);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {isLoading && <CircularProgress />}
      {/* <CircularProgress color="secondary" /> */}
    </div>
  );
}

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isLoading: state.loader.isLoading
});

export default connect(mapStateToProps)(Loader);
