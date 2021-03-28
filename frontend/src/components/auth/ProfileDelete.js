import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const ProfileDelete = ({ card, input, button, userEmail, onClickButton }) => {
  const [email, setEmail] = useState('');
  const [isDisabledButton, setIsDisabledButton] = useState(true);

  useEffect(() => {
    if (email === userEmail) {
      setIsDisabledButton(false);
    } else {
      setIsDisabledButton(true);
    }
  }, [email]);

  const onInputChange = e => {
    console.log('EMAIL:', e.target.value);
    setEmail(e.target.value);
  };

  return (
    <Card className={card}>
      <Typography variant="subtitle1" gutterBottom>
        Ne sei assolutamente sicuro?
      </Typography>

      <p>Se non leggi questo, accadranno cose brutte inaspettate!</p>
      <p>
        Questa azione non può essere annullata. Questo eliminerà definitivamente
        il tuo account.
      </p>
      <p>Digita la tua e-mail per confermare.</p>

      <TextField
        required
        variant="outlined"
        className={input}
        id="standard-email"
        label="Email"
        type="email"
        name="email"
        size="small"
        inputProps={{
          minLength: 8,
          maxLength: 64,
          pattern: '\\S+@\\S+\\.[a-z]{2,}'
        }}
        onChange={onInputChange}
      />
      <Button
        className={button}
        type="submit"
        variant="contained"
        color="secondary"
        onClick={onClickButton}
        disabled={isDisabledButton}
      >
        Cancella Account
      </Button>
    </Card>
  );
};

ProfileDelete.propTypes = {
  card: PropTypes.string.isRequired,
  input: PropTypes.string.isRequired,
  button: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
  onClickButton: PropTypes.func.isRequired
};

export default ProfileDelete;
