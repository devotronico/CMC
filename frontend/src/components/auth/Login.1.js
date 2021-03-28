import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../redux/auth/authActions';
import useForm from '../hooks/useForm';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: 'green',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  card: {
    // backgroundColor: 'violet',
    width: 600,
    padding: theme.spacing(2),
  },
  form: {
    // backgroundColor: 'pink',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      width: 250,
    },
  },
  textField: {
    marginTop: theme.spacing(6),
    // width: '100%'
    // maxWidth: 300
  },
  button: {
    marginTop: theme.spacing(6),
    // width: 250
  },
}));

function Login({ login, history, isLoading }) {
  console.log('Login');

  const classes = useStyles();

  const inputs = {
    emailRef: React.createRef(),
    passwordRef: React.createRef(),
  };

  const submit = (values) => {
    login({ ...values, history });
  };

  const {
    onInputChange,
    onFormSubmit,
    values,
    errors,
    isDisabledButton,
  } = useForm(submit);

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <form
          className={classes.form}
          noValidate
          autoComplete="off"
          onSubmit={onFormSubmit}
        >
          {/* <pre>{JSON.stringify(values, null, 2)}</pre>
        <pre>{JSON.stringify(errors, null, 2)}</pre> */}
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
          <TextField
            required
            variant="outlined"
            className={classes.textField}
            inputRef={inputs.emailRef}
            id="email"
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
              pattern: '\\S+@\\S+\\.[a-z]{2,}',
            }}
            onChange={onInputChange}
          />
          <TextField
            autoComplete="on"
            required
            variant="outlined"
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
          <Link component={RouterLink} to="/reset-password">
            Password dimenticata?
          </Link>
        </form>
      </Card>
    </div>
  );
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: state.loader.isLoading,
});

export default connect(mapStateToProps, { login })(Login);
