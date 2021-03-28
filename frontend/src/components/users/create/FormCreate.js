import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createUser, clearUser } from '../../../redux/user/userActions';
import { readUsers } from '../../../redux/users/usersActions';

import useForm from '../../hooks/useForm';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: 'yellow',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(2, 0, 6, 0)
  },
  paper: {
    // backgroundColor: 'orange',
    width: '100%',
    minHeight: '100%',
    maxWidth: 600,
    padding: theme.spacing(2)
  },
  form: {
    // backgroundColor: 'pink',
    height: 600,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    '& > *': {
      width: '100%',
      maxWidth: 500
    }
  }
}));

const FormCreate = ({ readUsers, createUser, clearUser, user, users }) => {
  const classes = useStyles();

  const submit = async (values) => {
    values.isActive = values.isActive || false;
    console.log('submit');
    console.log('values', values);
    await createUser(values);
    readUsers();
    console.log('READ USERS');
  };

  const {
    onInputChange,
    onFormSubmit,
    values,
    errors,
    isDisabledButton
  } = useForm(submit, { original: 'password', clone: 'password2' }, 4);

  if (user) {
    const { name, email, role, isActive } = user;
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
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
      </div>
    );
  }

  return (
    <div className={classes.root}>
      {/* <div className={classes.body}> */}
      <Paper className={classes.paper}>
        <form
          className={classes.form}
          noValidate
          autoComplete="off"
          onSubmit={onFormSubmit}
        >
          {/* <span>values: </span>
        <pre>{JSON.stringify(values, null, 2)}</pre>
        <span>errors: </span>
        <pre>{JSON.stringify(errors, null, 2)}</pre> */}
          <TextField
            required
            variant="outlined"
            className={classes.formElement}
            id="standard-name"
            label="Name"
            type="text"
            name="name"
            value={values.name ? values.name : ''}
            helperText={
              errors.name ? errors.name : values.name && 'Valore valido'
            }
            error={errors.name ? true : false}
            inputProps={{
              minLength: 2,
              maxLength: 10,
              pattern: '[a-zA-Z]+'
            }}
            onChange={onInputChange}
          />
          <TextField
            required
            variant="outlined"
            className={classes.formElement}
            id="standard-email"
            label="Email"
            type="email"
            name="email"
            value={values.email ? values.email : ''}
            helperText={
              errors.email ? errors.email : values.email && 'Valore valido'
            }
            error={errors.email ? true : false}
            inputProps={{
              minLength: 8,
              maxLength: 64,
              pattern: '\\S+@\\S+\\.[a-z]{2,}'
            }}
            onChange={onInputChange}
          />
          <TextField
            autoComplete="on"
            required
            variant="outlined"
            className={classes.formElement}
            id="standard-Password"
            label="Password"
            type="password"
            name="password"
            value={values.password ? values.password : ''}
            helperText={
              errors.password
                ? errors.password
                : values.password && 'Valore valido'
            }
            error={errors.password ? true : false}
            inputProps={{ minLength: 6, maxLength: 64, pattern: '.+' }}
            onChange={onInputChange}
          />
          <TextField
            autoComplete="on"
            required
            variant="outlined"
            className={classes.formElement}
            id="standard-Password2"
            label="Ripeti la Password"
            type="password"
            name="password2"
            value={values.password2 ? values.password2 : ''}
            helperText={
              errors.password2
                ? errors.password2
                : values.password2 && 'Valore valido'
            }
            error={errors.password2 ? true : false}
            inputProps={{ minLength: 6, maxLength: 64, pattern: '.+' }}
            onChange={onInputChange}
          />
          <FormControlLabel
            className={classes.formElement}
            label="Attivare l'Utente?"
            control={
              <Switch
                checked={values.isActive ? true : false}
                onChange={onInputChange}
                value={values.isActive ? true : false}
                name="isActive"
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            }
          />
          <Button
            className={classes.formElement}
            type="submit"
            variant="contained"
            color="primary"
            disabled={isDisabledButton ? true : false}
          >
            Invia
          </Button>
        </form>
      </Paper>
      {/* </div> */}
    </div>
  );
};

FormCreate.propTypes = {
  readUsers: PropTypes.func.isRequired,
  createUser: PropTypes.func.isRequired,
  clearUser: PropTypes.func.isRequired,
  user: PropTypes.object,
  users: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  users: state.users.users
});

export default connect(mapStateToProps, { readUsers, createUser, clearUser })(
  FormCreate
);
// readUsers, createUser, clearUser, user, users
