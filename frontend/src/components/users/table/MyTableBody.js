import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const useStyles = makeStyles((theme) => ({
  avatar: {
    display: 'flex',
    alignItems: 'center',
    '& > *': { marginLeft: 10 }
  },
  emptyCell: {
    width: '100%'
  }
}));

function MyTableBody({
  rows,
  order,
  orderBy,
  page,
  rowsPerPage,
  selected,
  setSelected,
  dense
}) {
  const classes = useStyles();

  const handleClick = (event, user_id) => {
    // console.log('user_id', user_id);
    const selectedIndex = selected.indexOf(user_id);
    // console.log('selectedIndex', selectedIndex);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, user_id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (user_id) => selected.indexOf(user_id) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <TableBody>
      {stableSort(rows, getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, index) => {
          const isItemSelected = isSelected(row._id);
          const labelId = `enhanced-table-checkbox-${index}`;

          return (
            <TableRow hover key={row._id} tabIndex={-1}>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={isItemSelected}
                  inputProps={{ 'aria-labelledby': labelId }}
                  onClick={(event) => handleClick(event, row._id)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  selected={isItemSelected}
                />
              </TableCell>
              <TableCell component="th" id={labelId} scope="row" padding="none">
                <div className={classes.avatar}>
                  {!dense && <Avatar alt={row.username} src={row.avatar} />}
                  <span>{row.username}</span>
                </div>
              </TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.age}</TableCell>
              <TableCell>{row.role}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.isAuthenticated === 1 ? 'SI' : 'NO'}</TableCell>
              <TableCell align="right">
                {moment(row.register_at).format('DD-MM-YYYY || HH:mm:ss')}
              </TableCell>

              {/* <TableCell align="right">
                  <Button variant="outlined" color="primary">
                    View
                  </Button>
                </TableCell> */}
            </TableRow>
          );
        })}
      {emptyRows > 0 && (
        <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
          <TableCell
            colSpan={8}
            id="empty-cell"
            className={classes.emptyCell}
          />
        </TableRow>
      )}
    </TableBody>
  );
}

MyTableBody.propTypes = {
  rows: PropTypes.array.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  selected: PropTypes.array.isRequired,
  setSelected: PropTypes.func.isRequired,
  dense: PropTypes.bool.isRequired
};

export default MyTableBody;
