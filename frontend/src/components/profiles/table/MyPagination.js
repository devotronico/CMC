import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Pagination from '@material-ui/lab/Pagination';

/// Bottone RIGHE PER PAGINA
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(2)
    }
  },
  formControl: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: theme.spacing(1),
    minWidth: 70,
    '& > *': {
      margin: theme.spacing(1)
    }
  }
}));

const MyPagination = ({
  setCurrentPage,
  currentPage,
  lastPage,
  rowsPerPage,
  onChangePage,
  onChangeRowsPerPage
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handlePage = (event, value) => {
    console.log('value', value);
    onChangePage(event, value - 1);
    // setCurrentPage(value);
  };

  // const handleChange = event => {
  //   setRowsPerPage(event.target.value);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
        <Typography variant="body2" gutterBottom>
          Righe per pagina:
        </Typography>
        <Select
          labelId="label-row-for-page"
          id="select-row-for-page"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={rowsPerPage}
          onChange={event => onChangeRowsPerPage(event)}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </Select>
      </FormControl>
      <Pagination
        count={lastPage}
        showFirstButton
        showLastButton
        siblingCount={1}
        page={currentPage + 1}
        onChange={handlePage}
      />
    </div>
  );
};

export default MyPagination;
