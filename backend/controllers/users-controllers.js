// const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const crypto = require('crypto');
const faker = require('faker');

const User = require('../models/User');

/**
 * @route   GET api/logs
 * @desc    Ottiene tutti gli Users
 * @webpage /users
 * @action  getUsers
 * @access  Private
 * @return  Users
 */
const getUsers = async (req, res, next) => {
  req.userAction = 'Get Users';
  /// <m>
  const errorMessage = {
    type: 'error',
    title: 'Errore Server',
    msg: 'Si è verificato un errore, riprovare piu tardi.',
    timeout: 10000
  }; /// </m>

  try {
    const users = await User.find().lean();
    console.log('Get all Users');
    res.status(200).json(users);
    return next();
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: [errorMessage] });
    return next();
  }
};

/**
 * @route   GET api/users
 * @desc    Get all Users
 * @webpage /users
 * @action  getUsers
 * @access  Public
 * @returns {String} array json di tutti gli user
 */
/* const getUsers = async (req, res) => {
  try {
    // const users = await User.find().pretty();
    const users = await User.find();

    console.log('Get all Users');
    res.status(201).json(users);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error 1');
  }
}; */

/**
 * @route   PUT api/users/many
 * @desc    update many user
 * @webpage /users/:id
 * @action  cambia i nomi
 * @access  Private
 * @returns {Json} user
 * [a] Cerca gli user che ha il nome che match il :
 *
 *      $set: se il campo worked non esiste lo crea.
 *      new: se `true`, restituisce il documento modificato anziché l'originale,
 *           il valore predefinito è false
 * [b] Nel documento users cambia aggiorna i valori ....
 * [c] salva il documento aggiornato.
 */
const updateUsers = async (req, res) => {
  req.userAction = 'Update Users';

  try {
    const users = await User.updateMany({ name: /Ryu$/ }, { active: true });
    console.log('USERS', users);
    return res.status(200).json({
      msg: `Numero di docs trovati ${users.n}. Numero di doc modificati ${users.nModified}`
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
};

/**
 * @route   PUT api/users/selected
 * @desc    aggiorna una lista di user
 * @webpage /users/list
 * @action  updateSelectedUsers
 * @access  Private
 * @returns {Json} user
 * [a] Cerca gli user che ha il nome che match il :
 *
 *      $set: se il campo worked non esiste lo crea.
 *      new: se `true`, restituisce il documento modificato anziché l'originale,
 *           il valore predefinito è false
 * [b] Nel documento users cambia aggiorna i valori ....
 * [c] salva il documento aggiornato.
 */
const updateSelectedUsers = async (req, res, next) => {
  req.userAction = 'Update Selected Users';

  /// <m>
  const errorMessage = {
    type: 'error',
    title: 'Errore Server',
    msg: 'Si è verificato un errore, riprovare piu tardi.',
    timeout: 10000
  };

  // const warnMessage = {
  //   type: 'warning',
  //   title: 'Errore Aggiornamento',
  //   msg: 'Non è stato modificato nessun Utente.',
  //   timeout: 10000
  // };
  /// </m>

  const selected = req.body.selected;
  const type = req.body.type;
  let value = req.body.value;
  console.log('DATA A :', value);

  /*   if (type === 'register_at') {
    value = new Date(value);
    console.log('DATA B : ', value);
    // value = `${value}.000+00:00`;
  } */

  console.log('TYPE', type);
  console.log('type VALUE', typeof value);

  // res.status(500).json({ errors: [errorMessage] });
  // return next();

  // return res.status(200).json({
  //   selected,
  //   type,
  //   value
  // });

  let updatedUsers;
  try {
    updatedUsers = await User.updateMany(
      { _id: { $in: selected } },
      { [type]: value }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: [errorMessage] });
  }

  if (!updatedUsers) {
    return res.status(500).json({ errors: [errorMessage] });
  }

  if (updatedUsers.n === 0) {
    return res.status(500).json({ errors: [errorMessage] }); // [b]
  }

  try {
    const users = await User.find().lean();
    console.log('Get all Users');
    res.status(200).json(users);
    return next();
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: [errorMessage] });
    return next();
  }
};
/**
 * @route   POST api/users/create/many
 * @desc    Create many User con name, email, password
 * @webpage /users/create/many
 * @action  createUsers
 * @access  Private
 * @returns {String} stringa json con i valori: id,name,email,role,Token JWT
 * Note: Il campo `email` avendo l'attributo `unique: true`,
 * se si prova a inserire un email che è gia presente nella collezione,
 * nessun nuovo documento viene creato.
 */
const createUsers = async (req, res) => {
  req.userAction = 'Create Users';

  // console.log('BODY', req.body);

  const errMsg = 'Iscrizione non riuscita, riprova più tardi.';
  for (const obj of req.body) {
    const { name, email, password } = obj;

    /// Crea l'avatar
    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm'
    }); // [c]

    /// Setta il ruolo
    const role = 'user';

    /// [d] Fa l' hash della password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
      return res
        .status(500)
        .json({ errors: [{ msg: "Impossibile creare l'utente, riprova" }] });
    }

    /**
     * crea un codice hash per validare l'utente con una mail da inviare al suo indirizzo email
     * es: 5f4dcc3b5aa765d61d8327deb882cf99
     * len: 32
     */
    const verify = crypto
      .createHash('md5')
      .update('password')
      .digest('hex'); // [e]

    /// [f] Salva il nuovo utente nel database
    const createdUser = new User({
      name,
      email,
      avatar,
      password: hashedPassword,
      verify,
      role,
      active: true
    });

    try {
      await createdUser.save();
    } catch (err) {
      return res.status(500).json({ errors: [{ msg: `${errMsg} 3` }] });
    }
  }

  res.status(201).json({ msg: 'Utenti creati' });
};

/**
 * @route   DELETE api/users/all
 * @desc    Delete all users. Cancella tutti gli user
 * @webpage /users
 * @action  deleteUsers
 * @access Private
 * @returns {Json} messaggio di successo
 */
const deleteUsers = async (req, res) => {
  req.userAction = 'Delete Users';

  try {
    await User.remove({});
    // await User.deleteMany({ user: req.user.id });
    res.json({ msg: 'Tutti gli utenti sono stati cancellati' });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error e');
  }
};

/**
 * @route   GET api/users
 * @desc    Get all Users
 * @webpage /users
 * @action  getUsers
 * @access  Public
 * @returns {String} array json di tutti gli user
 */
const getfakeUsers = async (req, res) => {
  req.userAction = 'Get Fake Users';

  try {
    // const users = await User.find().pretty();
    const users = await User.find({ isFake: true });

    console.log('Get all fake Users');
    res.status(201).json(users);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error 1');
  }
};

/**
 * @route   POST api/users/fake [COMMENTI DA RIVEDERE]
 * @desc    l'admin crea utenti finti con: name, email, password, etc
 * @webpage /user/fake
 * @action  createFakeUser
 * @access  Private
 * @returns {String} stringa json con i valori: id,name,email,role.
 *   req: invia al server i parametri del body(name, email, password).
 *   res: ritorna la risposta dal server.
 * Vengono eseguiti i seguenti controlli sui valori inseriti dall'utente:
 * [a] `validationResult` check la validità dei valori(name,email,password).
 * [b] Se la stessa email è già presente nel database ritorna errore.
 * [c] Generato un avatar. @see https://www.npmjs.com/package/gravatar-url
 * [d] Crea un documento User con i valori:name,email,avatar,password.
 * [e] Viene fatto l'Encrypt della password.
 * [f] Col metodo `save` viene salvato il nuovo user nel db assegnandogli un id.
 * [g] Setta e Invia email all' user per verificare e attivare il suo account.
 * [h] // ? Settare i cookie ?
 */
const createFakeUsers = async (req, res) => {
  req.userAction = 'Create Fake Users';

  // return res.status(200).json({ test: 'createFakeUsers OK' });

  /// <c> Crea l'avatar
  // const avatar = gravatar.url(email, {s: '80',d: 'retro',r: 'pg'}); /// </c>
  const number = req.body.number;
  if (!number) {
    return res.status(500).json({ msg: 'NUMERO NON VALIDO O INESISTENTE' });
  }

  // avatar: gravatar.url(null, { s: '80', d: 'retro', r: 'pg' }),
  const roles = ['system', 'admin', 'user'];
  const status = ['sospeso', 'bannato', 'attivato'];
  let arr = [];
  for (let i = 0; i < number; i++) {
    const obj = {
      isActive: false,
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      avatar: `http://api.adorable.io/avatars/face/${Math.floor(
        Math.random() * (99 - 1)
      ) + 1}`,
      verify: '000000',
      isFake: true,
      role: roles[Math.floor(Math.random() * roles.length)],
      login_at: faker.date.between(faker.date.past(), faker.date.recent()),
      logout_at: faker.date.between(faker.date.past(), faker.date.recent()),
      register_at: faker.date.between(faker.date.past(), faker.date.recent()),
      isAuthenticated: Math.floor(Math.random() * 2),
      status: status[Math.floor(Math.random() * status.length)],
      age: Math.floor(Math.random() * (99 - 1)) + 1
    };
    arr.push(obj);
  }

  User.insertMany(arr, function(error, docs) {
    if (error) {
      return res.status(500).json({ msg: 'ERRORE' });
    }
    console.log(docs);
    return res.status(200).json(arr);
    // return res.status(200).json({ msg: 'Utenti finti inseriti' });
  });

  /*
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  } // [a]

  const { name, email, password, isActive } = req.body;

  console.log('isActive', isActive);
  console.log('typeof isActive', typeof isActive);

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
    name,
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

  res.status(201).json({
    name: createdUser.name,
    email: createdUser.email,
    role: createdUser.role,
    isActive: createdUser.isActive
  });
  */
};

const deleteFakeUsers = async (req, res) => {
  req.userAction = 'Delete Fake Users';

  User.deleteMany({ isFake: true }, function(err) {
    if (err) {
      return res.status(500).json({ msg: 'ERRORE' });
    }
    return res
      .status(200)
      .json({ msg: 'GLI UTENTI FAKE SONO STATI CANCELLATI' });
  });
};

/**
 * @route   DELETE api/users/selected
 * @desc    Cancella tutti gli user selezionati
 * @webpage /users/list
 * @action  deleteSelectedUsers
 * @access Private
 * @returns {Json} messaggio di successo
 */
const deleteSelectedUsers = async (req, res, next) => {
  req.userAction = 'Delete Selected Users';
  /// <m>
  const errorMessage = {
    type: 'error',
    title: 'Errore Server',
    msg: 'Si è verificato un errore, riprovare piu tardi.',
    timeout: 10000
  };

  const warnMessage = {
    type: 'warning',
    title: 'Errore Cancellazione',
    msg: 'Non è stato cancellato nessun Utente',
    timeout: 10000
  }; /// </m>

  const userList = req.body.list;
  console.log('USERLIST:', userList);
  if (!userList) {
    return res
      .status(500)
      .json({ msg: 'NESSUN UTENTE SELEZIONATO DA CANCELLARE' });
  }

  let deleteUsers;
  try {
    deleteUsers = await User.deleteMany({ _id: { $in: userList } });
  } catch (error) {
    res.status(500).json({ errors: [errorMessage] });
    return next();
  }

  if (!deleteUsers) {
    res.status(500).json({ errors: [errorMessage] });
    return next();
  }

  if (!deleteUsers.ok) {
    res.status(500).json({ errors: [errorMessage] });
    return next();
  }

  if (deleteUsers.deletedCount === 0) {
    res.status(500).json({ errors: [warnMessage] });
    return next();
  }

  // getUsers();
  try {
    const users = await User.find().lean();
    console.log('Get all Users');
    res.status(200).json(users);
    return next();
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: [errorMessage] });
    return next();
  }

  // return res.status(200).json({
  //   msg: `I ${users.deletedCount} Utenti selezionati sono stati cancellati`
  // });
};

exports.getUsers = getUsers;
exports.getfakeUsers = getfakeUsers;
exports.createUsers = createUsers;
exports.createFakeUsers = createFakeUsers;
exports.updateUsers = updateUsers;
exports.updateSelectedUsers = updateSelectedUsers;
exports.deleteUsers = deleteUsers;
exports.deleteSelectedUsers = deleteSelectedUsers;
exports.deleteFakeUsers = deleteFakeUsers;
