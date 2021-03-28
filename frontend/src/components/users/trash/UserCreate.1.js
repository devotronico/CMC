import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createUser, clearUser } from '../../../redux/user/userActions';

import useForm from '../../auth/hooks/useForm';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'yellow',
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  textField: {
    width: 250
  }
}));

const UserCreate = ({ createUser, clearUser, user }) => {
  // console.log('UserCreate');
  const classes = useStyles();
  const [waitResponse, setWaitResponse] = useState(false);

  const submit = values => {
    // const result = testObject.zxc || 'Hello!';
    values.isActive = values.isActive || false;
    console.log('submit');
    console.log('values', values);
    setWaitResponse(true);
    createUser(values);
  };

  useEffect(() => {
    if (user) {
      setWaitResponse(false);
    }
  }, [user]);

  const {
    onInputChange,
    onFormSubmit,
    values,
    errors,
    isDisabledButton
  } = useForm(submit, { original: 'password', clone: 'password2' });

  if (waitResponse) {
    return (
      <div>
        <Typography variant="subtitle1" gutterBottom>
          ATTENDERE RISPOSTA DEL SERVER
        </Typography>
      </div>
    );
  }

  if (user) {
    const { name, email, role, isActive } = user;
    return (
      <div>
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
      </div>
    );
  }

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Crea un utente
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Crea un nuovo utente
      </Typography>
      <form
        className={classes.root}
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
          className={classes.textField}
          id="standard-name"
          label="Name"
          type="text"
          name="name"
          value={values.name ? values.name : ''}
          margin="normal"
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
          className={classes.textField}
          id="standard-email"
          label="Email"
          type="email"
          name="email"
          value={values.email ? values.email : ''}
          margin="normal"
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
          className={classes.textField}
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
          className={classes.textField}
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
        <br />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isDisabledButton ? true : false}
        >
          Invia
        </Button>
      </form>
    </>
  );
};

UserCreate.propTypes = {
  createUser: PropTypes.func.isRequired,
  clearUser: PropTypes.func.isRequired,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  user: state.user.user
});

export default connect(mapStateToProps, { createUser, clearUser })(UserCreate);
