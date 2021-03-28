const { validationResult } = require('express-validator');
const gravatar = require('gravatar');
const sendEmailAuth = require('../config/transporter');
const utils = require('../utils/functions');

// const HttpError = require('../models/http-error');
const User = require('../models/User');

/**
 * @route   [1] GET /api/user/test
 * @desc    TEST
 * @webpage /
 * @action  test
 * @access  Public
 * @returns {String}
 */
const test = async (req, res, next) => {
  req.userAction = 'Test User';
  res.status(201).send('TEST USER');
  return next();
};

/**
 * @route   POST api/user/create
 * @desc    l'admin crea un nuovo a utente con: username, email, password
 * @webpage /user/create
 * @action  createUser
 * @access  Private
 * @returns {String} stringa json con i valori: id,username,email,role.
 *   req: invia al server i parametri del body(username, email, password).
 *   res: ritorna la risposta dal server.
 * Vengono eseguiti i seguenti controlli sui valori inseriti dall'utente:
 * [a] `validationResult` check la validità dei valori(username,email,password).
 * [b] Se la stessa email è già presente nel database ritorna errore.
 * [c] Generato un avatar. @see https://www.npmjs.com/package/gravatar-url
 * [d] Crea un documento User con i valori:username,email,avatar,password.
 * [e] Viene fatto l'Encrypt della password.
 * [f] Col metodo `save` viene salvato il nuovo user nel db assegnandogli un id.
 * [g] Setta e Invia email all' user per verificare e attivare il suo account.
 * [h] // ? Settare i cookie ?
 */
const createUser = async (req, res) => {
  req.userAction = 'Create User';

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  } // [a]

  const { username, email, password, isActive } = req.body;

  // console.log('isActive', isActive);
  // console.log('typeof isActive', typeof isActive);

  /// INFO ERRORE
  const failMessage = {
    type: 'error',
    title: 'Errore Registrazione Utente',
    msg: 'Iscrizione non riuscita, riprovare più tardi.',
    timeout: 10000
  };

  let existingUser;
  try {
    existingUser = await User.findOne({ email }); // [b]
  } catch (err) {
    return res.status(500).json({ errors: [failMessage] }); // [b]
  }

  if (existingUser) {
    failMessage.msg = `Un utente con l' email ${email} è già registrato`;
    return res.status(400).json({ errors: [failMessage] }); // [b]
  }

  /// Crea l'avatar
  const avatar = gravatar.url(email, {
    s: '200',
    r: 'pg',
    d: 'mm'
  }); // [c]

  /// Setta il ruolo
  const totalUser = await User.countDocuments();
  const role = !totalUser ? 'system' : totalUser === 1 ? 'admin' : 'user';

  /// Fa l' hash della password
  const hashedPassword = await utils.createHash(password, failMessage, res);

  /// Crea l' hash per il codice verify
  const verify = await utils.createHash(
    new Date().toString(),
    failMessage,
    res,
    true
  );

  /// Salva il nuovo utente nel database
  const createdUser = new User({
    username,
    email,
    avatar,
    password: hashedPassword,
    verify,
    role,
    isActive
  });

  try {
    await createdUser.save();
  } catch (err) {
    return res.status(500).json({ errors: [failMessage] });
  }

  /// [g] Invia email all' user per successiva attivazione del suo account
  if (!isActive) {
    sendEmailAuth(
      res,
      email,
      'verify',
      verify,
      'Attivazione Account',
      '<p>Clicca il bottone per attivare il tuo account.</p><br>'
    );
  }

  const location = `${req.protocol}://${req.get('host')}${req.baseUrl}${
    req.path
  }/${createdUser._id}`;
  // console.log('LOCATION:', location);
  res.setHeader('Location', location);
  res.status(201).json({
    username: createdUser.username,
    email: createdUser.email,
    role: createdUser.role,
    isActive: createdUser.isActive
  });
};

/**
 * @route   GET api/users/:id
 * @desc    Get User by user ID
 * @webpage /users/:id
 * @action  getUser
 * @access  Public
 * @returns {Json} documento del profilo
 * [d] Cerca l' user da mostrare tramite user.id ricevuto
 *     come parametro dell' url
 *     Con `populate` aggiunge al file json di ritorno i valori
 *     'username', 'avatar' all'interno dell'oggetto user
 */
const getUser = async (req, res) => {
  req.userAction = 'Get User';

  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(400).json({ msg: 'Utente non trovato' });
    }

    res.json(user);
  } catch (error) {
    // console.log(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Utente non trovato' });
    }
    res.status(500).send('Server Error a');
  }
};

/**
 * @route   PUT api/users/:id
 * @desc    update user
 * @webpage /users/:id
 * @action  setWorked
 * @access  Private
 * @returns {Json} user
 * [a] Cerca l'user da aggiornare:
 *      _id: user.id ricevuto da url.
 *      $set: se il campo worked non esiste lo crea.
 *      new: se `true`, restituisce il documento modificato anziché l'originale,
 *           il valore predefinito è false
 * [b] Nel documento users cambia aggiorna i valori ....
 * [c] salva il documento aggiornato.
 */
const updateUser = async (req, res) => {
  req.userAction = 'Update User';

  try {
    const username = req.body.username;
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { username: username } },
      { new: true }
    ); // [a] Update
    return res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error b');
  }
};

/**
 * @route   DELETE api/users
 * @desc    Delete user
 * @webpage /users
 * @action  deleteUser
 * @access Private
 * @returns {Json} messaggio di successo
 * Cancella un documento user
 * [a] Cerca il documento User da cancellare
 *     tramite user.id ricevuto dal token jwt.
 */
const deleteUser = async (req, res) => {
  req.userAction = 'Delete User';

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json({ msg: 'Utente non trovato' });
    }
  } catch (error) {
    console.log(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Utente non trovato' });
    }
    res.status(500).send('Server Error c');
  }

  try {
    await User.findOneAndRemove({ _id: req.params.id });
    return res.status(200).json({ msg: 'Utente cancellato' });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error d');
  }
};

exports.test = test;
exports.createUser = createUser;
exports.getUser = getUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
