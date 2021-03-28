// next(200, data, createFakeProfiles, s)
const faker = require('faker');
const Profile = require('../models/Profile');
const messages = require('../utils/messages');
const utils = require('../utils/functions');

/**
 * @route   GET /api/profiles/test
 * @desc    TEST
 * @webpage /
 * @action  test
 * @access  public
 * @returns {String}
 */
const test = async (req, res, next) => {
  req.userAction = 'Test Profiles';

  /// <a>
  const message = utils.useExpressValidator(req, messages.test.w);
  if (message) {
    res.status(422).json({ data: null, message });
    return next();
  }
  /// </a>

  const data = {
    name: 'Daniele',
    lastname: 'Manzi',
    age: 36
  };
  const result = {
    data,
    message: [messages.test.s]
  };

  res.status(201).json(result);
  return next();
};
/**
 * @route   GET /api/profiles/prova
 * @desc    prova
 * @webpage /
 * @action  prova
 * @access  public
 * @returns {String}
 */
const prova = async (req, res, next) => {
  req.userAction = 'Prova Profiles';

  /// <a>
  const message = utils.useExpressValidator(req, messages.prova.w);
  if (message) {
    res.status(422).json({ data: {}, message });
    return next();
  }
  /// </a>

  const data = {
    name: 'Maria',
    lastname: 'Giugliano',
    age: 55
  };

  const result = {
    data,
    message: [messages.prova.s]
  };

  res.status(201).json(result);
  return next();
};

/**
 * @route   POST api/profiles
 * @desc    Crea Profili
 * @webpage /profiles
 * @action  createProfiles
 * @access  private
 * @returns {String} stringa json con i valori: id,name,role,Token JWT
 */
const createProfiles = async (req, res, next) => {
  req.userAction = 'Create Profiles';

  if (!req.body.length) {
    res.status(500).json({ data: null, message: [messages.createProfiles.w] });
    return next();
  }

  let createdProfiles;
  try {
    createdProfiles = await Profile.create(req.body);
  } catch (err) {
    res.status(500).json({ data: null, message: [messages.createProfiles.e] });
    return next();
  }

  if (!createdProfiles) {
    res.status(500).json({ data: null, message: [messages.createProfiles.w] });
    return next();
  }

  res
    .status(201)
    .json({ data: req.body, message: [messages.createProfiles.s] });
  return next();
};

/**
 * @route   POST api/profiles/fake
 * @desc    l'admin crea profili finti con: name, lastname,age, etc
 * @webpage /profile/fake
 * @action  createFakeProfiles
 * @access  private
 * @returns {String} profili creati e messaggio
 * Esempio di dati da processare:
 * {
 * "number" : 2
 * }
 *   req: invia al server i parametri del body(name, lastname, age).
 *   res: ritorna la risposta dal server.
 * Vengono eseguiti i seguenti controlli sui valori inseriti dall'utente:
 * [a] `validationResult` check la validità dei valori(name,lastname,age).
 * [d] Crea un documento Profile con i valori:name,lastname,age.
 * [f] Col metodo `save` viene salvato il nuovo profilo nel db.
 */
const createFakeProfiles = async (req, res, next) => {
  req.userAction = 'Create Fake Profiles';

  const number = req.body.number;
  if (!number) {
    res
      .status(500)
      .json({ data: null, message: [messages.createFakeProfiles.w] });
    return next();
  }

  // const gender = ['system', 'admin', 'user'];

  let arr = [];
  for (let i = 0; i < number; i++) {
    const obj = {
      name: faker.name.firstName(),
      lastname: faker.name.lastName(),
      age: Math.floor(Math.random() * (99 - 1)) + 1,
      created_at: faker.date.between(faker.date.past(), faker.date.recent()),
      isFake: true
    };
    arr.push(obj);
  }

  Profile.insertMany(arr, function (error, docs) {
    if (error) {
      res
        .status(500)
        .json({ data: null, message: [messages.createFakeProfiles.e] });
      return next();
    }

    res
      .status(200)
      .json({ data: arr, message: [messages.createFakeProfiles.s] });
    return next();
  });
};

/**
 * @route   GET api/profiles
 * @desc    Ottiene tutti i Profili
 * @webpage /profiles
 * @action  readProfiles
 * @access  public
 * @return  profili e messaggio
 */
const readProfiles = async (req, res, next) => {
  req.userAction = 'Get Profiles';

  let profiles;
  try {
    profiles = await Profile.find().lean();
  } catch (error) {
    res.status(500).json({ data: null, message: [messages.readProfiles.e] });
    return next();
  }

  if (!profiles.length) {
    res
      .status(200)
      .json({ data: profiles, message: [messages.readProfiles.i] });
    return next();
  }

  res.status(200).json({ data: profiles, message: [messages.readProfiles.s] });
  return next();
};

/**
 * @route   GET api/profiles/fake
 * @desc    Ottiene tutti i Profili falsi
 * @webpage /profiles
 * @action  readFakeProfiles
 * @access  public
 * @returns {String} profili e messaggio
 */
const readFakeProfiles = async (req, res, next) => {
  req.userAction = 'Get Fake Profiles';

  let profiles;
  try {
    profiles = await Profile.find({ isFake: true });
  } catch (error) {
    res
      .status(500)
      .json({ data: null, message: [messages.readFakeProfiles.e] });
    return next();
  }

  if (!profiles.length) {
    res
      .status(200)
      .json({ data: profiles, message: [messages.readFakeProfiles.i] });
    return next();
  }

  res
    .status(201)
    .json({ data: profiles, message: [messages.readFakeProfiles.s] });
  return next();
};

/**
 * @route   PUT api/profiles
 * @desc    aggiorna i profili
 * @webpage /profiles
 * @action  updateProfiles
 * @access  private
 * @returns {Json} profili aggiornati
 * [a] Cerca i profili che ha il nome che match il :
 *      $set: se il campo worked non esiste lo crea.
 *      new: se `true`, restituisce il documento modificato anziché l'originale,
 *           il valore predefinito è false
 * [b] Nel documento profiles cambia aggiorna i valori ....
 * [c] salva il documento aggiornato.
 */
const updateProfiles = async (req, res, next) => {
  req.userAction = 'Update Profiles';

  const {
    findForProp,
    pattern,
    caseSensitive,
    findAtStart,
    findAtEnd,
    propToChange,
    newValue
  } = req.body;

  let search = pattern.replace(/\*/g, '.');
  search = new RegExp(`${findAtStart}${search}${findAtEnd}`, caseSensitive);

  try {
    const profiles = await Profile.updateMany(
      { [findForProp]: search },
      { [propToChange]: newValue }
    );
    console.log('Profiles', profiles);
    // successMessage.msg = `Numero di profili trovati ${profiles.n}. Numero di profili modificati ${profiles.nModified}`;
    res.status(201).json({ data: null, message: [messages.updateProfiles.s] });

    return next();
  } catch (err) {
    res.status(500).json({ data: null, message: [messages.updateProfiles.e] });
    return next();
  }
};

/**
 * @route   PUT api/profiles/selected
 * @desc    aggiorna una lista di profili
 * @webpage /profiles/list
 * @action  updateSelectedProfiles
 * @access  private
 * @param {Object} body
 * @param {Array}  body.selected - lista di id dei profili
 * @param {String} body.prop - la prop dei profili da modificare
 * @param {String} body.value - Il nuovo valore da assegnare alle prop
 * @returns {Json} tutti i profili e messaggio
 * Esempio di dati da processare:
 * {
 * "selected": ["5e94e028e0f79c1d0075397a","5e94e028e0f79c1d0075397b"],
 * "prop": "age", "value": 7
 * }
 *
 * [a] Cerca i profili che ha il nome che match il :
 *      $set: se il campo worked non esiste lo crea.
 *      new: se `true`, restituisce il documento modificato anziché l'originale,
 *           il valore predefinito è false
 * [b] Nel documento profiles cambia aggiorna i valori ....
 * [c] salva il documento aggiornato.
 */
const updateSelectedProfiles = async (req, res, next) => {
  req.userAction = 'Update Selected Profiles';

  /// <a>
  const message = utils.useExpressValidator(
    req,
    messages.updateSelectedProfiles.w
  );
  if (message) {
    res.status(422).json({ data: {}, message });
    return next();
  }
  /// </a>

  const { selected, prop, value } = req.body;

  let updatedProfiles;
  try {
    updatedProfiles = await Profile.updateMany(
      { _id: { $in: selected } },
      { [prop]: value }
    );
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .json({ data: null, message: [messages.updateSelectedProfiles.e] });
  }

  if (!updatedProfiles) {
    res
      .status(500)
      .json({ data: null, message: [messages.updateSelectedProfiles.e] });
    return next();
  }

  if (updatedProfiles.n === 0) {
    res
      .status(500)
      .json({ data: null, message: [messages.updateSelectedProfiles.e] });
    return next();
  }

  try {
    const profiles = await Profile.find().lean();
    res
      .status(201)
      .json({ data: profiles, message: [messages.updateSelectedProfiles.s] });
    return next();
  } catch (error) {
    res
      .status(500)
      .json({ data: null, message: [messages.updateSelectedProfiles.e] });
    return next();
  }
};

/**
 * @route   DELETE api/profiles
 * @desc    Cancella tutti i profili
 * @webpage /profiles
 * @action  deleteProfiles
 * @access private
 * @returns {Json} messaggio
 */
const deleteProfiles = async (req, res, next) => {
  req.userAction = 'Delete Profiles';

  try {
    await Profile.remove({});
    res.status(200).json({ data: null, message: [messages.deleteProfiles.s] });
    return next();
  } catch (error) {
    res.status(500).json({ data: null, message: [messages.deleteProfiles.e] });
    return next();
  }
};

/**
 * @route   DELETE api/profiles/selected
 * @desc    Cancella tutti i profili selezionati
 * @webpage /profiles/list
 * @action  deleteSelectedProfiles
 * @access private
 * @param {Object} body
 * @param {Array}  body.selected - lista di id dei profili
 * @returns {Json} profiles e messaggio
 */
const deleteSelectedProfiles = async (req, res, next) => {
  req.userAction = 'Delete Selected Profiles';

  /// <a>
  const message = utils.useExpressValidator(
    req,
    messages.deleteSelectedProfiles.w
  );
  if (message) {
    res.status(422).json({ data: {}, message });
    return next();
  }
  /// </a>

  const profileList = req.body.list;

  if (!profileList) {
    res
      .status(500)
      .json({ data: null, message: [messages.deleteSelectedProfiles.e] });
    return next();
  }

  let deleteProfiles;
  try {
    deleteProfiles = await Profile.deleteMany({ _id: { $in: profileList } });
  } catch (error) {
    res
      .status(500)
      .json({ data: null, message: [messages.deleteSelectedProfiles.e] });
    return next();
  }

  if (!deleteProfiles) {
    res
      .status(500)
      .json({ data: null, message: [messages.deleteSelectedProfiles.e] });
    return next();
  }

  if (!deleteProfiles.ok) {
    res
      .status(500)
      .json({ data: null, message: [messages.deleteSelectedProfiles.e] });
    return next();
  }

  if (deleteProfiles.deletedCount === 0) {
    res
      .status(500)
      .json({ data: null, message: [messages.deleteSelectedProfiles.e] });
    return next();
  }

  try {
    const profiles = await Profile.find().lean();
    res
      .status(200)
      .json({ data: profiles, message: [messages.deleteSelectedProfiles.s] });
    return next();
  } catch (error) {
    res
      .status(500)
      .json({ data: null, message: [messages.deleteSelectedProfiles.e] });
    return next();
  }
};

/**
 * @route   DELETE api/profiles/fake
 * @desc    Cancella tutti i profili finti
 * @webpage /profiles
 * @action  deleteFakeProfiles
 * @access private
 * @returns {Json} messaggio di successo
 */
const deleteFakeProfiles = async (req, res, next) => {
  req.userAction = 'Delete Fake Profiles';

  Profile.deleteMany({ isFake: true }, function (err) {
    if (err) {
      res
        .status(500)
        .json({ data: null, message: [messages.deleteFakeProfiles.e] });
      return next();
    }
    res
      .status(200)
      .json({ data: null, message: [messages.deleteFakeProfiles.s] });
    return next();
  });
};

exports.test = test;
exports.prova = prova;
exports.createProfiles = createProfiles;
exports.createFakeProfiles = createFakeProfiles;
exports.readProfiles = readProfiles;
exports.readFakeProfiles = readFakeProfiles;
exports.updateProfiles = updateProfiles;
exports.updateSelectedProfiles = updateSelectedProfiles;
exports.deleteProfiles = deleteProfiles;
exports.deleteSelectedProfiles = deleteSelectedProfiles;
exports.deleteFakeProfiles = deleteFakeProfiles;
