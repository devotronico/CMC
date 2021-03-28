import React from 'react';

// import { makeStyles } from "@material-ui/core/styles";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FilledInput from '@material-ui/core/FilledInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

// const useStyles = makeStyles(theme => ({}));

export default function UpdateAge({ age, handleChange, handleUpdate }) {
  // const classes = useStyles();

  return (
    <FormControl variant="filled">
      <InputLabel htmlFor="update-age">ANNI</InputLabel>
      <FilledInput
        id="update-age"
        type="number"
        value={age}
        onChange={handleChange('age')}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="update age"
              onClick={event => handleUpdate(event, 'age', age)}
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
