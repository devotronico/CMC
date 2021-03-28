import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  title: {
    color: '#546e7a',
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: 0.33
  }
}));

const defaultValue = '';
export default function FilterRadio({ filters, setFilters }) {
  const classes = useStyles();

  const [value, setValue] = useState(defaultValue);
  // const [value, setValue] = useState("female");

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
    <FormControl component="fieldset">
      <Typography
        variant="overline"
        display="block"
        gutterBottom
        className={classes.title}
      >
        User Status
      </Typography>
      <RadioGroup
        aria-label="status"
        name="status"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel
          value={defaultValue}
          control={<Radio color="primary" />}
          label="Tutti"
        />
        <FormControlLabel
          value="sospeso"
          control={<Radio color="primary" />}
          label="Sospeso"
        />
        <FormControlLabel
          value="attivato"
          control={<Radio color="primary" />}
          label="Attivato"
        />
        <FormControlLabel
          value="bannato"
          control={<Radio color="primary" />}
          label="Bannato"
        />
      </RadioGroup>
    </FormControl>
  );
}
