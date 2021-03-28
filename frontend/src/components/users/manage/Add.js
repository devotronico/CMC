import React, { useState, useEffect, useRef } from 'react';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  inputBox: {
    marginBottom: 30,
    textAlign: 'center'
  },
  inputField: {
    width: '75%'
  },
  btnGroup: {
    margin: theme.spacing(0),
    '& > *': {
      margin: theme.spacing(0.5),
      minWidth: 60,
      minHeight: 60,
      borderRadius: 50,
      fontWeight: 600,
      padding: 0
    }
  },
  btnPlus: {
    minWidth: 40,
    minHeight: 40,
    marginTop: 26,
    borderRadius: '50%'
  },
  btnReset: {
    marginTop: 40,
    minWidth: 200
  },
  btnAdd: {
    marginTop: 30,
    minWidth: 200
  },
  btnDelete: {
    marginTop: 30,
    minWidth: 200
  }
}));

export default function Add({ readUsers, createFakeUsers }) {
  const classes = useStyles();
  const [isErrorInput, setIsErrorInput] = useState(false);
  const [counter, setCounter] = useState(0);
  const [num, setNum] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [isDisabledButton, setIsDisabledButton] = useState(true);

  const inputNumber = useRef();

  useEffect(() => {
    if (Number.isInteger(num)) {
      if (num > 0) {
        setIsDisabledButton(false);
        if (num > 1000) {
          setNum(1000);
        }
      } else {
        setNum(0);
        setIsDisabledButton(true);
        setInputValue('');
      }
    } else {
      setNum(0);
      setIsDisabledButton(true);
    }
  }, [num]);

  useEffect(() => {
    if (counter > 0) {
      setTimeout(() => setCounter(counter - 1), 1000);
    } else {
      setIsErrorInput(false);
    }
  }, [counter]);

  const handleInputValue = () => {
    setNum(+inputNumber.current.value + num);
    inputNumber.current.value = '';
  };

  const handleInputNumber = e => {
    if (!e.target.validity.valid) {
      setIsErrorInput(true);
      setCounter(2);
    } else {
      setIsErrorInput(false);
    }
    setInputValue(e.target.value.replace(/\D/g, ''));
  };

  const addFakeResource = async () => {
    if (num) {
      setNum(0);
      await createFakeUsers(num);
      readUsers();
    }
  };

  return (
    <Paper className={classes.paper}>
      <Typography variant="h6">Aggiungere gli User</Typography>
      <div className={classes.inputBox}>
        <TextField
          inputRef={inputNumber}
          id="number"
          label="Numero"
          type="text"
          name="number"
          margin="normal"
          helperText="accetta solo numeri interi da 1 a 1000"
          error={isErrorInput}
          inputProps={{
            minLength: 1,
            maxLength: 4,
            pattern: '[1-9][0-9]{0,3}'
          }}
          onChange={handleInputNumber}
          value={inputValue}
          className={classes.inputField}
        />

        <Button
          variant="contained"
          color="default"
          onClick={handleInputValue}
          disabled={isErrorInput || !inputValue}
          className={classes.btnPlus}
        >
          +
        </Button>
      </div>

      <div className={classes.btnGroup}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setNum(num + 1)}
        >
          + 1
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setNum(num + 10)}
        >
          + 10
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setNum(num + 100)}
        >
          + 100
        </Button>
      </div>
      <div className={classes.btnGroup}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setNum(num - 1)}
        >
          - 1
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setNum(num - 10)}
        >
          - 10
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setNum(num - 100)}
        >
          - 100
        </Button>
      </div>
      <Button
        variant="contained"
        color="default"
        onClick={() => setNum(0)}
        disabled={isDisabledButton}
        className={classes.btnReset}
      >
        Resetta i Valori
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={addFakeResource}
        disabled={isDisabledButton}
        className={classes.btnAdd}
      >
        Aggiungi {num} User
      </Button>
    </Paper>
  );
}
