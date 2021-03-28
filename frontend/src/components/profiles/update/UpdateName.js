import React from 'react';

// import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FilledInput from '@material-ui/core/FilledInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

// const useStyles = makeStyles(theme => ({}));

export default function UpdateName({ username, handleChange, handleUpdate }) {
  // const classes = useStyles();

  return (
    <FormControl variant="filled">
      <InputLabel htmlFor="update-username">Username</InputLabel>
      <FilledInput
        id="update-username"
        type="text"
        value={username}
        onChange={handleChange('username')}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="update username"
              onClick={(event) => handleUpdate(event, 'username', username)}
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
