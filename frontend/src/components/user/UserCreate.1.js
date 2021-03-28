import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createUser, clearUser } from '../../redux/user/userActions';

import Header from '../shared/Header';
import useForm from '../hooks/useForm';
import UserCreateSuccess from './UserCreateSuccess';

import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import clsx from 'clsx';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  desktop: {
    // backgroundColor: 'red',
    padding: theme.spacing(3)
  },
  mobile: {
    // backgroundColor: 'yellow',
    padding: theme.spacing(0)
  },
  body: {
    // backgroundColor: 'pink',
    display: 'flex',
    justifyContent: 'center'
  },
  paper: {
    width: '100%',
    maxWidth: 600,
    padding: theme.spacing(2)
  },
  form: {
    // backgroundColor: 'green',
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

const UserCreate = ({ createUser, clearUser, user }) => {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:600px)');
  const device = matches ? 'desktop' : 'mobile';

  const submit = (values) => {
    values.isActive = values.isActive || false;
    console.log('submit');
    console.log('values', values);
    createUser(values);
  };

  const {
    onInputChange,
    onFormSubmit,
    values,
    errors,
    isDisabledButton
  } = useForm(submit, { original: 'password', clone: 'password2' });

  return (
    <div className={clsx(classes.root, classes[device])}>
      <Header
        section={'Utente'}
        title={'Crea un utente'}
        subtitle={'Crea un nuovo utente'}
      />
      <div className={classes.body}>
        {user ? (
          <UserCreateSuccess
            user={user}
            clearUser={clearUser}
            paper={classes.paper}
          />
        ) : (
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
                type="submit"
                variant="contained"
                color="primary"
                disabled={isDisabledButton ? true : false}
              >
                Invia
              </Button>
            </form>
          </Paper>
        )}
      </div>
    </div>
  );
};

UserCreate.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  createUser: PropTypes.func.isRequired,
  clearUser: PropTypes.func.isRequired,
  user: PropTypes.object
};

const mapStateToProps = (state) => ({
  isLoading: state.loader.isLoading,
  user: state.user.user
});

export default connect(mapStateToProps, { createUser, clearUser })(UserCreate);
