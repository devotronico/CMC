import React from 'react';
import { connect } from 'react-redux';
import { newPassword } from '../../../redux/auth/authActions';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import useForm from '../hooks/useForm';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 250
    }
  }
}));

function NewPassword({ newPassword, history, user }) {
  const classes = useStyles();
  const { hash } = useParams();

  const inputs = {
    emailRef: React.createRef()
  };

  const submit = values => {
    console.log('hash', hash);
    console.log('hash', { ...values, hash, history });
    // newPassword({ ...values, hash, history });
  };

  const {
    onInputChange,
    onFormSubmit,
    values,
    errors,
    isDisabledButton
  } = useForm(submit);

  if (user) {
    return (
      <div>
        <Typography variant="subtitle1" gutterBottom>
          Ti sei loggato con la tua nuova password.
        </Typography>
      </div>
    );
  }

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Crea Nuova Password
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
          required
          inputRef={inputs.password2Ref}
          id="standard-Password2"
          label="Ripeti la Password"
          type="password"
          name="password2"
          value={values.password2 ? values.password2 : ''}
          helperText={
            values.password2 && values.password2 !== values.password
              ? 'Le due password non sono uguali'
              : values.password2 && 'Valore valido'
          }
          error={
            values.password2 && values.password2 !== values.password
              ? true
              : false
          }
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
    </>
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

// Register.propTypes = {
//   register: PropTypes.func.isRequired,
//   user: PropTypes.object
// };

// const mapStateToProps = state => ({
//   user: state.auth.user
// });

// export default connect(mapStateToProps, { register })(Register);
