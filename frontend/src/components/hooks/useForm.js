import { useState, useEffect } from 'react';
import validate from '../utils/validate';
import fixValues from '../utils/fixValues';

const useForm = (submit, pairElements, inputsNumber = null) => {
  // console.log('useForm');
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isDisabledButton, setIsDisabledButton] = useState(true);
  // const [num, setNum] = useState(
  //   document.querySelectorAll('INPUT.MuiInput-input').length
  // );

  // let num;
  // useEffect(() => {
  //   num = document.querySelectorAll('INPUT.MuiInput-input').length;
  //   console.log('NUM:', num);
  // }, []);

  const onInputChange = (event) => {
    // console.log(event.target);
    const { type, name, value, checked } = event.target;
    // console.log('type:', type);
    // console.log('name:', name);
    console.log('value:', value);
    // console.log('checked:', checked);
    if (type === 'checkbox') {
      setValues({ ...values, [name]: checked });
    } else {
      setValues({ ...values, [name]: fixValues(name, value) });
      setErrors({ ...errors, [name]: validate(event.target) });
      if (pairElements && name === pairElements.clone) {
        if (values[pairElements.original] !== value) {
          setErrors({ ...errors, [name]: 'Le due password non sono uguali' });
          //console.log('DIVERSI');
        } else {
          setErrors({ ...errors, [name]: '' });
          //console.log('UGUALI');
        }
      }
    }
  };

  useEffect(() => {
    const numOfValues = Object.keys(values).length;

    const numOfInputs =
      inputsNumber ??
      document.querySelectorAll('INPUT.MuiInputBase-input').length;
    // console.log('Values', numOfValues);
    // console.log('Inputs', numOfInputs);
    if (numOfValues === numOfInputs) {
      let isError = '';
      for (let key in errors) {
        isError += errors[key];
      }
      isError ? setIsDisabledButton(true) : setIsDisabledButton(false);
    }
  }, [errors, values]);

  const onFormSubmit = (event) => {
    event.preventDefault();
    if (!isDisabledButton) {
      //   setIsDisabledInput(true);
      setIsDisabledButton(true);
      submit(values);
      setValues({});
    }
  };

  return {
    onInputChange,
    onFormSubmit,
    values,
    errors,
    isDisabledButton
  };
};

export default useForm;
