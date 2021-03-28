import React from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const UserCreateSuccess = ({
  user: { name, email, role, isActive },
  clearUser,
  paper
}) => {
  return (
    <Paper className={paper}>
      <Typography variant="subtitle1" gutterBottom>
        Il seguente utente è stato appena creato:
      </Typography>
      <ul>
        <li>
          <span>name: </span>
          <span>{name}</span>
        </li>
        <li>
          <span>email: </span>
          <span>{email}</span>
        </li>
        <li>
          <span>role: </span>
          <span>{role}</span>
        </li>
        <li>
          <span>isActive: </span>
          <span>{isActive ? 'SI' : 'NO'}</span>
        </li>
      </ul>
      <Button onClick={clearUser} variant="contained" color="primary">
        Crea Nuovo User
      </Button>
    </Paper>
  );
};

UserCreateSuccess.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserCreateSuccess;
