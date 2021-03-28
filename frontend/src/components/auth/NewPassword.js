import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { newPassword } from '../../redux/auth/authActions';
import { useParams } from 'react-router-dom';
import useForm from '../hooks/useForm';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
    padding: theme.spacing(2)
  },
  form: {
    // backgroundColor: 'pink',
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
  // root: {
  //   '& > *': {
  //     margin: theme.spacing(1),
  //     width: 250
  //   }
  // }
}));

function NewPassword({ newPassword, history, user }) {
  const classes = useStyles();
  const { hash } = useParams();

  const inputs = {
    emailRef: React.createRef()
  };

  const submit = values => {
    // console.log('hash', hash);
    // console.log('TEST', { ...values, hash, history });
    newPassword({ ...values, hash, history });
  };

  const {
    onInputChange,
    onFormSubmit,
    values,
    errors,
    isDisabledButton
  } = useForm(submit, { original: 'password', clone: 'password2' });

  if (user) {
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <Typography variant="subtitle1" gutterBottom>
            Ti sei loggato con la tua nuova password.
          </Typography>
        </Card>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <Typography variant="h5" gutterBottom>
          Crea Nuova Password
        </Typography>
        <form
          className={classes.form}
          noValidate
          autoComplete="off"
          onSubmit={onFormSubmit}
        >
          {/* <pre>{JSON.stringify(values, null, 2)}</pre>
      <pre>{JSON.stringify(errors, null, 2)}</pre> */}
          <TextField
            required
            variant="outlined"
            className={classes.textField}
            inputRef={inputs.passwordRef}
            id="password"
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
            required
            variant="outlined"
            className={classes.textField}
            inputRef={inputs.password2Ref}
            id="password2"
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
        </form>
      </Card>
    </div>
  );
}

NewPassword.propTypes = {
  newPassword: PropTypes.func.isRequired,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, { newPassword })(NewPassword);
