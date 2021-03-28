import React, { useState } from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  textField: {
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
    width: 220
  }
}));

const date = moment();
const currentDate = date.format('YYYY-MM-DDTHH:mm:ss');
// console.log(currentDate);
const pastDate = date.subtract(10, 'years').format('YYYY-MM-DDTHH:mm:ss');
// console.log(pastDate);

export default function FilterDate({ filters, setFilters }) {
  const classes = useStyles();
  const [arr, setValues] = useState([pastDate, currentDate]);

  const handleOnChange = index => e => {
    arr[index] = e.target.value;
    setValues(arr);
    setFilters({ ...filters, [e.target.name]: arr });
    console.log('VALUE', e.target.value);
    console.log('DATES', arr);
  };

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="from-date"
        label="da questa data"
        type="datetime-local"
        defaultValue={pastDate}
        className={classes.textField}
        name="register_at"
        InputLabelProps={{
          shrink: true
        }}
        onChange={handleOnChange(0)}
      />
      <TextField
        id="to-date"
        label="a questa data"
        type="datetime-local"
        defaultValue={currentDate}
        className={classes.textField}
        name="register_at"
        InputLabelProps={{
          shrink: true
        }}
        onChange={handleOnChange(1)}
      />
    </form>
  );
}
