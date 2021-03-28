import React, { useState, useEffect, useRef } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  formControl: {
    width: '100%'
  },
  label: {
    lineHeight: 0.2
  },
  select: {
    padding: '12px 26px 10px 12px'
  }
}));

const defaultValue = '';
export default function FilterRole({ filters, setFilters }) {
  const classes = useStyles();
  const [value, setValue] = useState(defaultValue);

  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChange = e => {
    setValue(e.target.value);
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (Object.keys(filters).length === 0) {
      setValue(defaultValue);
    }
  }, [filters]);

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel
        ref={inputLabel}
        htmlFor="outlined-age-native-simple"
        className={classes.label}
      >
        Ruolo
      </InputLabel>
      <Select
        classes={{
          select: classes.select
        }}
        native
        value={value}
        onChange={handleChange}
        labelWidth={labelWidth}
        inputProps={{
          name: 'role',
          id: 'role'
        }}
      >
        <option value="" />
        <option value="system">System</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </Select>
    </FormControl>
  );
}
