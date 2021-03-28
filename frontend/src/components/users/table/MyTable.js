import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { DeviceContext } from '../../layout/Container';

/// <COMPONENTI>
import MyTableHead from './MyTableHead';
import MyTableToolbar from './MyTableToolbar';
import MyTableBody from './MyTableBody';
import UpdateRows from '../update/UpdateRows';
import MyPagination from './MyPagination';
/// </COMPONENTI>

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: theme.spacing(3, 0)
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 600
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  },
  clsTest: {
    backgroundColor: 'red'
  }
}));

export default function MYTable({ rows }) {
  const classes = useStyles();
  const device = useContext(DeviceContext);
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('register_at');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [lastPage, setLastPage] = useState(0);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  useEffect(() => {
    console.log('SELECTED:', selected);
    setLastPage(Math.ceil(rows.length / rowsPerPage));
    // Math.ceil(rows.length / rowsPerPage)
  }, [rows, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    console.log('newPage', event.target.value);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  return (
    <div id="table" className={classes.root}>
      <Typography variant="body2" gutterBottom color="textSecondary">
        {rows.length} utenti trovati. Pagina {page + 1}
        {' / '}
        {lastPage}
      </Typography>
      <Paper className={classes.paper}>
        <MyTableToolbar selected={selected} setSelected={setSelected} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <MyTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <MyTableBody
              rows={rows}
              order={order}
              orderBy={orderBy}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={selected}
              setSelected={setSelected}
              dense={dense}
            />
          </Table>
        </TableContainer>
        {device === 'desktop' ? (
          <MyPagination
            setCurrentPage={setPage}
            currentPage={page}
            lastPage={lastPage}
            rowsPerPage={rowsPerPage}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        ) : (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            labelRowsPerPage="rows"
          />
        )}
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
      <UpdateRows selected={selected} setSelected={setSelected} />
    </div>
  );
}

MYTable.propTypes = {
  rows: PropTypes.array.isRequired
};
