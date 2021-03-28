import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2)
    }
  }
}));

function Loader({ isLoading }) {
  // console.log('Loader', isLoading);
  const classes = useStyles();
  const [start, setStart] = useState(null);

  // if (isLoading) {
  //   console.log(1);
  //   const asd = new Date();
  //   setStart(asd);
  // }

  useEffect(() => {
    console.log('Loader', isLoading);
    // console.log(123);

    if (isLoading && !start) {
      console.log(456);
      // const asd = new Date();
      setStart(new Date());
    }

    if (!isLoading && start) {
      console.log(789);
      const finish = new Date();
      const diff = finish - start; //milliseconds interval
      console.log('diff', diff);
      setStart(null);
    }
  }, [isLoading]);

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
