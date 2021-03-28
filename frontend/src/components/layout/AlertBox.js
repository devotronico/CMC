import React, { useState, useEffect } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';

export default function AlertBox({ severity, title, msg }) {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    console.log(isOpen);
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div onClick={() => setIsOpen(!isOpen)}>
      <Alert severity={severity} variant="filled">
        <AlertTitle>{title}</AlertTitle>
        {msg}
      </Alert>
    </div>
  );
}
