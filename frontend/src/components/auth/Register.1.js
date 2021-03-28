import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../../redux/auth/authActions';
import useForm from '../hooks/useForm';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
  root: {
    // backgroundColor: 'green',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  card: {
    // backgroundColor: 'violet',
    width: 600,
    // minWidth: 300,
    padding: theme.spacing(2)
  },
  form: {
    // backgroundColor: 'yellow',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      width: 250
    }
  },
  textField: {
    marginTop: theme.spacing(6)
  },
  button: {
    marginTop: theme.spacing(6)
  }
}));

const Register = ({ register, user }) => {
  console.log('Register');
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

  React.useEffect(() => {
    console.log('isDisabledButton', isDisabledButton);
  }, [isDisabledButton]);

  if (user) {
    const { name, email, role } = user;
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <Typography variant="subtitle1" gutterBottom>
            Grazie <strong>{name}</strong> per esserti iscritto al nostro sito
            nel ruolo di <strong>{role}</strong>.
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Per completare la registrazione vai alla tua email{' '}
            <strong>{email}</strong> e clicca il bottone "Conferma Iscrizione".
          </Typography>
        </Card>
      </div>
    );
  }

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
            Registrazione
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Crea il tuo account
          </Typography>
          <TextField
            required
            variant="outlined"
            className={classes.textField}
            inputRef={inputs.nameRef}
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
            className={classes.textField}
            inputRef={inputs.emailRef}
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
            variant="outlined"
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
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
            disabled={isDisabledButton ? true : false}
          >
            Invia
          </Button>
          <br />
          <Link component={RouterLink} to="/login">
            Hai già un account? Login
          </Link>
        </form>
      </Card>
    </div>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, { register })(Register);
