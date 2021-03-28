import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../../../redux/auth/authActions';
import useForm from '../hooks/useForm';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200
    }
  },
  textField: {
    width: 250
  }
}));

const Register = ({ register, user, isLoading }) => {
  console.log('Register');
  console.log('isLoading', isLoading);
  const classes = useStyles();

  const inputs = {
    nameRef: React.createRef(),
    emailRef: React.createRef(),
    passwordRef: React.createRef(),
    password2Ref: React.createRef()
  };

  const submit = values => {
    register(values);
  };

  const {
    onInputChange,
    onFormSubmit,
    values,
    errors,
    isDisabledButton
  } = useForm(submit, { original: 'password', clone: 'password2' });

  if (isLoading) {
    return (
      <div>
        <Typography variant="subtitle1" gutterBottom>
          ATTENDERE RISPOSTA DEL SERVER
        </Typography>
      </div>
    );
  }

  if (user) {
    const { name, email, role } = user;
    return (
      <div>
        <Typography variant="subtitle1" gutterBottom>
          Grazie <strong>{name}</strong> per esserti iscritto al nostro sito nel
          ruolo di <strong>{role}</strong>.
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Per completare la registrazione vai alla tua email{' '}
          <strong>{email}</strong> e clicca il bottone "Conferma Iscrizione".
        </Typography>
      </div>
    );
  }

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Registrazione
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Crea il tuo account
      </Typography>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={onFormSubmit}
      >
        {/* <pre>{JSON.stringify(values, null, 2)}</pre>
        <pre>{JSON.stringify(errors, null, 2)}</pre> */}
        <TextField
          required
          className={classes.textField}
          inputRef={inputs.nameRef}
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
          inputRef={inputs.emailRef}
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
          inputRef={inputs.passwordRef}
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
          inputRef={inputs.password2Ref}
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
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isDisabledButton ? true : false}
        >
          Invia
        </Button>
      </form>
      <br />
      <Link component={RouterLink} to="/login">
        Hai già un account? Login
      </Link>
    </>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  user: PropTypes.object,
  isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  isLoading: state.loader.isLoading
});

export default connect(mapStateToProps, { register })(Register);
