import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { readUsers } from '../../redux/users/usersActions';
import moment from 'moment';
import MYPagination from './manage/MYPagination';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    // padding: theme.spacing(3),
    backgroundColor: 'pink'
  },
  table: {
    minWidth: 300
  },
  name: {
    fontSize: 16,
    fontWeight: 600,
    color: 'rgba(0, 0, 0, 0.7)'
  }
});

const Users = ({ readUsers, users }) => {
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentUsers, setCurrentUsers] = useState(users.slice(0, rowsPerPage));
  const [lastPage, setLastPage] = useState(0);

  useEffect(() => {
    console.log('currentPage', currentPage);
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    setCurrentUsers(users.slice(indexOfFirstRow, indexOfLastRow));
    setLastPage(Math.ceil(users.length / rowsPerPage));
  }, [currentPage, users, rowsPerPage]);

  useEffect(() => {
    readUsers();
  }, [readUsers]);

  return (
    <div className={classes.root}>
      <Card>
        <CardHeader title="Lista degli User" />

        <Typography>
          Page: {currentPage}
          {' / '}
          {lastPage}
        </Typography>

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Role</TableCell>
                <TableCell align="right">Is Active</TableCell>
                <TableCell align="right">Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentUsers.map((row) => (
                <TableRow key={row._id}>
                  <TableCell component="th" scope="row">
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={classes.name}
                    >
                      {row.username}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">{row.role}</TableCell>
                  <TableCell align="right">
                    {row.isActive ? 'SI' : 'NO'}
                  </TableCell>
                  <TableCell align="right">
                    {moment
                      .utc(row.register_at)
                      .format('DD-MM-YYYY || HH:mm:ss')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <MYPagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          lastPage={lastPage}
          setRowsPerPage={setRowsPerPage}
          rowsPerPage={rowsPerPage}
        />
      </Card>
    </div>
  );
};

Users.propTypes = {
  readUsers: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  users: state.users.users
});

export default connect(mapStateToProps, { readUsers })(Users);
