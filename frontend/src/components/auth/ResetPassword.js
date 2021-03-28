import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetPassword } from '../../redux/auth/authActions';
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
}));

function ResetPassword({ resetPassword, history, user }) {
  const classes = useStyles();

  const inputs = {
    emailRef: React.createRef()
  };

  const submit = values => {
    resetPassword({ ...values, history });
  };

  const {
    onInputChange,
    onFormSubmit,
    values,
    errors,
    isDisabledButton
  } = useForm(submit, history);

  if (user) {
    const { email } = user;
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <Typography variant="subtitle1" gutterBottom>
            Per creare una nuova password, segui la procedura descritta nel
            messaggio che ti è stato inviato al tuo indirizzo email{' '}
            <strong>{email}</strong>
          </Typography>
        </Card>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <Typography variant="h5" gutterBottom>
          Password Dimenticata
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
            inputRef={inputs.emailRef}
            id="email"
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

ResetPassword.propTypes = {
  resetPassword: PropTypes.func.isRequired,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, { resetPassword })(ResetPassword);

// Register.propTypes = {
//   register: PropTypes.func.isRequired,
//   user: PropTypes.object
// };

// const mapStateToProps = state => ({
//   user: state.auth.user
// });

// export default connect(mapStateToProps, { register })(Register);
