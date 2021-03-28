import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
  root: {
    // height: 100,
    padding: '24px',
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "space-around",
    '& > button': {
      width: '100%'
    },
    '& > button:nth-of-type(2)': {
      marginTop: 16
    },
    '& > button:nth-of-type(3)': {
      marginTop: 16
    }
  }
}));

export default function FilterButtons({
  handleClickFilterButton,
  setFilters,
  setIsOpen
}) {
  const classes = useStyles();

  const handleResetFilter = () => {
    setFilters({});
  };

  const handleApplyFilter = () => {
    handleClickFilterButton();
  };

  const handleApplyFilterAndClose = () => {
    handleClickFilterButton();
    setIsOpen(false);
  };

  return (
    <div className={classes.root}>
      <Button
        variant="contained"
        color="default"
        startIcon={<DeleteIcon />}
        onClick={handleResetFilter}
      >
        Resetta
      </Button>
      <Button variant="contained" color="primary" onClick={handleApplyFilter}>
        Filtra
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleApplyFilterAndClose}
      >
        Filtra e Chiudi
      </Button>
    </div>
  );
}
