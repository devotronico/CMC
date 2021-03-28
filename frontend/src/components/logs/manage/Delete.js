import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  formControl: {
    margin: theme.spacing(3)
  },
  btnDelete: {
    marginTop: 30,
    minWidth: 200
  }
}));

export default function Delete({ readLogs, deleteFakeLogs }) {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const [value, setValue] = React.useState('female');

  const handleChange = event => {
    setValue(event.target.value);
  };

  const onClickDelete = async () => {
    if (value) {
      await deleteFakeLogs(value);
      readLogs();
    }
  };

  useEffect(() => {
    if (email === 'dmanzi83@outlook.com') {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email]);

  const onInputEmailChange = e => {
    setEmail(e.target.value);
  };
  return (
    <Paper className={classes.paper}>
      <Typography variant="h6">Cancellare i Log</Typography>

      <TextField
        id="standard-email"
        label="Email"
        type="email"
        name="email"
        margin="normal"
        inputProps={{
          minLength: 8,
          maxLength: 64,
          pattern: '\\S+@\\S+\\.[a-z]{2,}'
        }}
        onChange={onInputEmailChange}
      />

      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Cosa vuoi cancellare?</FormLabel>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel
            disabled={isDisabled}
            value="2"
            control={<Radio />}
            label="Log finti"
          />
          <FormControlLabel
            disabled={isDisabled}
            value="1"
            control={<Radio />}
            label="Log veri"
          />
          <FormControlLabel
            disabled={isDisabled}
            value="0"
            control={<Radio />}
            label="Tutti i Log"
          />
        </RadioGroup>
      </FormControl>

      <Button
        className={classes.btnDelete}
        type="submit"
        variant="contained"
        color="secondary"
        onClick={onClickDelete}
        disabled={isDisabled}
      >
        CANCELLA
      </Button>
    </Paper>
  );
}
