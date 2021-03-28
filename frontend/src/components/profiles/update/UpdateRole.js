import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
// import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const useStyles = makeStyles((theme) => ({
  role: {
    // backgroundColor: "blue",
    // margin: 20,
    display: 'flex',
    alignItems: 'center',
  },
}));

export default function UpdateRole({ role, handleChange, handleUpdate }) {
  const classes = useStyles();

  return (
    <div className={classes.role}>
      <FormControl variant="filled">
        <InputLabel htmlFor="update-role">Ruolo</InputLabel>
        <Select
          native
          value={role}
          onChange={handleChange('role')}
          labelWidth={40}
          inputProps={{
            name: 'role',
            id: 'update-role',
          }}
        >
          <option value="" />
          <option value="system">System</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </Select>
      </FormControl>
      <IconButton
        aria-label="attiva"
        onClick={(event) => handleUpdate(event, 'role', role)}
      >
        <CheckCircleIcon />
      </IconButton>
    </div>
  );
}
