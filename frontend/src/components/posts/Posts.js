import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { readPosts } from '../../redux/posts/postsActions';

import { Link } from 'react-router-dom';
import moment from 'moment';

import Header from '../shared/Header';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%'
  },
  table: {
    minWidth: 650
  }
}));

const Posts = ({ readPosts, rows }) => {
  const classes = useStyles();

  useEffect(() => {
    readPosts();
  }, [readPosts]);

  useEffect(() => {
    if (rows) {
      console.log('ROWS', rows);
      if (rows.lenght) {
        console.log('OK');
      } else {
        console.log('KO');
      }
    }
  }, [rows]);

  return (
    <div className={classes.root}>
      <Header
        section={'POSTS'}
        title={'Lista Posts'}
        subtitle={'Lista completa dei post con dettagli'}
      />
      <Card className={classes.card}>
        <CardHeader title="Lista dei Post" />
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Titolo</TableCell>
                <TableCell>Autore</TableCell>
                <TableCell>Testo</TableCell>
                <TableCell>Tags</TableCell>
                <TableCell align="right">Data-Creazione</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!rows.length ? (
                <TableRow>
                  <TableCell align="center" colSpan={4}>
                    Nessun Dato Presente
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell component="th" scope="row">
                      <Link to={`/post/id/${row._id}`}>{row.title}</Link>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.user.name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.text}
                    </TableCell>
                    <TableCell>{row.tags.toString()}</TableCell>
                    <TableCell align="right">
                      {moment(row.created_at).format('DD-MM-YYYY || HH:mm:ss')}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};

Posts.propTypes = {
  readPosts: PropTypes.func.isRequired,
  rows: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  rows: state.posts.posts
});

export default connect(mapStateToProps, { readPosts })(Posts);
