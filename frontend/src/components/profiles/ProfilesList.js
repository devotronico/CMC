import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { readProfiles } from '../../redux/profiles/actions';

import ListHeader from './ListHeader';
import MyTable from './table/MyTable';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: 'pink',
    width: '100%',
    height: '100%'
  },
  btnDelete: {
    marginTop: 30,
    minWidth: 200
  }
}));

function ProfilesList({ readProfiles, profiles }) {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [jsonRows, setJsonRows] = useState('');

  useEffect(() => {
    readProfiles();
  }, [readProfiles]);

  useEffect(() => {
    if (profiles.length > 0) {
      setRows(profiles);
      setJsonRows(JSON.stringify(profiles));
      console.log('TEST: ', profiles);
    }
  }, [profiles]);

  return (
    <div className={classes.root}>
      <ListHeader jsonRows={jsonRows} setRows={setRows} />
      <MyTable rows={rows} />
    </div>
  );
}

ProfilesList.propTypes = {
  readProfiles: PropTypes.func.isRequired,
  profiles: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  profiles: state.profiles.profiles
});

export default connect(mapStateToProps, { readProfiles })(ProfilesList);
