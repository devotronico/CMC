import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FilledInput from '@material-ui/core/FilledInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const useStyles = makeStyles(theme => ({
  label: {
    // backgroundColor: "red",
    top: -12
  }
}));

export default function UpdateDate({
  register_at,
  handleChange,
  handleUpdate
}) {
  const classes = useStyles();

  return (
    <FormControl variant="filled">
      <InputLabel htmlFor="update-date" className={classes.label}>
        DATA
      </InputLabel>
      <FilledInput
        id="update-date"
        type="date"
        value={register_at}
        onChange={handleChange('register_at')}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="Update Data"
              onClick={event => handleUpdate(event, 'register_at', register_at)}
              edge="end"
            >
              <CheckCircleIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}
