const validate = objCurrent => {
  const { validity, name } = objCurrent;

  /// Per evitare il controllo su un campo input vedere l'esempio sotto:
  // if (name === 'password') {
  //   return '';
  // }
  const {
    valid,
    valueMissing,
    tooShort,
    tooLong,
    typeMismatch,
    patternMismatch
  } = validity;
  let error = '';
  if (!valid) {
    if (valueMissing) {
      error += 'il campo ' + name + ' è vuoto';
    } else if (tooShort) {
      error += 'il campo ' + name + ' è troppo corto';
    } else if (tooLong) {
      error += 'il campo ' + name + ' è troppo lungo';
    } else if (typeMismatch) {
      error += 'il valore digitato non corrisponde a un valore di tipo ' + name;
    } else if (patternMismatch) {
      // error += 'Il valore nel campo <b>' + name + '</b> non corrisponde al modello richiesto';
      error += `Il valore nel campo ${name} non corrisponde al modello richiesto`;
    }
  }
  return error;
};

export default validate;
