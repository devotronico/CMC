import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../../redux/auth/authActions';
import PropTypes from 'prop-types';
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
  },
  button: {
    width: 250
  }
}));

function Login({ login, history, isLoading }) {
  console.log('Login');

  const classes = useStyles();

  const inputs = {
    emailRef: React.createRef(),
    passwordRef: React.createRef()
  };

  const submit = values => {
    login({ ...values, history });
  };

  const {
    onInputChange,
    onFormSubmit,
    values,
    errors,
    isDisabledButton
  } = useForm(submit);

  if (isLoading) {
    return (
      <div>
        <Typography variant="subtitle1" gutterBottom>
          ATTENDERE RISPOSTA DEL SERVER
        </Typography>
      </div>
    );
  }

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Login
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
        <Button
          className={classes.button}
          type="submit"
          variant="contained"
          color="primary"
          disabled={isDisabledButton ? true : false}
        >
          Invia
        </Button>
        <br />
        <br />
        <Link component={RouterLink} to="/reset-password">
          Password dimenticata?
        </Link>
      </form>
    </>
  );
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isLoading: state.loader.isLoading
});

export default connect(mapStateToProps, { login })(Login);
