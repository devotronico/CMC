import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { readLogs } from '../../redux/logs/logsActions';
// import LogItem from './LogItem';
import moment from 'moment';

import Header from '../shared/Header';

import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import clsx from 'clsx';
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

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%'
  },
  desktop: {
    backgroundColor: 'red',
    padding: theme.spacing(3)
  },
  mobile: {
    backgroundColor: 'yellow',
    padding: theme.spacing(0)
  },
  table: {
    minWidth: 650
  },
  method: {
    fontSize: 16,
    fontWeight: 600,
    color: 'rgba(0, 0, 0, 0.7)'
  },
  code: {
    color: 'white',
    backgroundColor: 'blue',
    height: 20,
    display: 'inline-flex',
    padding: '4px 8px',
    flexGrow: 0,
    fontSize: 10,
    minWidth: 20,
    alignItems: 'center',
    flexShrink: 0,
    lineHeight: 10,
    whiteSpace: 'nowrap',
    borderRadius: 2,
    justifyContent: 'center'
  },
  codeColor: {
    backgroundColor: 'red'
  }
}));

const colorKo = {
  backgroundColor: 'rgb(229, 57, 53)'
};
const colorOk = {
  backgroundColor: 'rgb(67, 160, 71)'
};

const Logs = ({ readLogs, logs }) => {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:600px)');
  const device = matches ? 'desktop' : 'mobile';

  useEffect(() => {
    readLogs();
  }, [readLogs]);

  return (
    <div className={clsx(classes.root, classes[device])}>
      <Header
        section={'LOGS'}
        title={'Lista Logs'}
        subtitle={'Lista completa dei log con dettagli'}
      />
      <Card className={classes.card}>
        <CardHeader title="Lista dei Log" />
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Metodo</TableCell>
                <TableCell align="right">Codice</TableCell>
                <TableCell align="right">Rotta</TableCell>
                <TableCell align="right">Azione</TableCell>
                <TableCell align="right">Ip</TableCell>
                <TableCell align="right">Data</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logs.map(row => (
                <TableRow key={row._id}>
                  <TableCell component="th" scope="row">
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={classes.method}
                    >
                      {row.method}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="overline"
                      display="block"
                      gutterBottom
                      className={classes.code}
                      style={row.code < 400 ? colorOk : colorKo}
                    >
                      {row.code}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">{row.route}</TableCell>
                  <TableCell align="right">{row.action}</TableCell>
                  <TableCell align="right">{row.ip}</TableCell>
                  <TableCell align="right">
                    {moment.utc(row.date).format('DD-MM-YYYY || HH:mm:ss')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};

Logs.propTypes = {
  readLogs: PropTypes.func.isRequired,
  logs: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  logs: state.logs.logs
});

export default connect(mapStateToProps, { readLogs })(Logs);
