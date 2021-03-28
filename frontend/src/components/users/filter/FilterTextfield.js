import React, { useState, useEffect, useRef } from 'react';
import validate from './validate';
// import Paper from "@material-ui/core/Paper";
import TextField from '@material-ui/core/TextField';
// import Button from "@material-ui/core/Button";

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    // width: "50%",
    padding: theme.spacing(2)
    // display: "flex",
    // flexDirection: "column",
    // alignItems: "center"
  }
}));

const defaultValue = '';
export default function FilterTextfield({ filters, setFilters }) {
  const classes = useStyles();

  const [value, setValue] = useState(defaultValue);
  const [errors, setErrors] = useState('');
  // const [isDisabled, setIsDisabled] = useState(true);

  const emailRef = useRef(null);

  const handleChange = e => {
    setValue(e.target.value);
    // setValue(event.target.value);
    setFilters({ ...filters, [e.target.name]: e.target.value });
    validate(e.target);
    setErrors(validate(e.target));
  };

  useEffect(() => {
    if (Object.keys(filters).length === 0) {
      setValue(defaultValue);
    }
  }, [filters]);

  // useEffect(() => {
  //   errors ? setIsDisabled(true) : setIsDisabled(false);
  // }, [errors, value]);

  return (
    <div className={classes.root}>
      <TextField
        size="small"
        variant="outlined"
        className={classes.textField}
        inputRef={emailRef}
        id="standard-email"
        label="Email"
        type="email"
        name="email"
        value={value ? value : defaultValue}
        helperText={errors ? errors : value && 'Valore valido'}
        error={errors ? true : false}
        inputProps={{
          minLength: 8,
          maxLength: 64,
          pattern: '\\S+@\\S+\\.[a-z]{2,}'
        }}
        onChange={handleChange}
      />

      {/* <Button
        className={classes.btnDelete}
        type="submit"
        variant="contained"
        color="primary"
        // onClick={handleOnClick}
        disabled={isDisabled}
      >
        INVIA
      </Button> */}
    </div>
  );
}
