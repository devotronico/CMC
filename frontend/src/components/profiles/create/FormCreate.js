import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createProfile, clearProfile } from '../../../redux/profile/actions';
import { readProfiles } from '../../../redux/profiles/actions';

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

const FormCreate = ({
  readProfiles,
  createProfile,
  clearProfile,
  profile,
  profiles
}) => {
  const classes = useStyles();

  const submit = async (values) => {
    values.isActive = values.isActive || false;
    console.log('submit');
    console.log('values', values);
    await createProfile(values);
    readProfiles();
    console.log('READ');
  };

  const {
    onInputChange,
    onFormSubmit,
    values,
    errors,
    isDisabledButton
  } = useForm(submit, { original: 'password', clone: 'password2' }, 4);

  if (profile) {
    const { name, email, role, isActive } = profile;
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
          <Button onClick={clearProfile} variant="contained" color="primary">
            Crea Nuovo Profilo
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
  readProfiles: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired,
  clearProfile: PropTypes.func.isRequired,
  profile: PropTypes.object,
  profiles: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile.profile,
  profiles: state.profiles.profiles
});

export default connect(mapStateToProps, {
  readProfiles,
  createProfile,
  clearProfile
})(FormCreate);
