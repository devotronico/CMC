const Profile = require('../models/Profile');
const User = require('../models/User');
const utils = require('../utils/functions');

/**
 * @route   GET /api/profile/test
 * @desc    TEST
 * @webpage /
 * @action  test
 * @access  Public
 * @returns {String}
 */
const test = async (req, res, next) => {
  req.userAction = 'Test Profile';
  res.status(201).send('TEST PROFILE');
  return next();
};

/**
 * @route   POST api/Profile
 * @desc    un user crea il suo profilo.
 * @webpage /profile/create
 * @action  createProfile
 * @access  private
 * @returns {String} stringa json con i valori:
 *   req: invia al server i parametri del body(name, ...).
 *   res: ritorna la risposta dal server.
 * Vengono eseguiti i seguenti controlli sui valori inseriti dall'utente:
 * [a] `validationResult` check la validità dei valori(name,...).
 * [b] Crea un documento Profile con i valori:name,...
 * [c] Col metodo `save` viene salvato il nuovo profilo nel db assegnandogli un id.
 */
const createProfile = async (req, res, next) => {
  req.userAction = 'Create Profile';

  /// <a>
  const errorMessage = {
    type: 'error',
    title: 'Errore Creazione Profilo',
    msg: 'Creazione Profilo non riuscita, riprovare più tardi.',
    timeout: 10000
  };

  const warnMessage = {
    type: 'warning',
    title: 'Errore Creazione Profilo',
    msg: 'Creazione Profilo non riuscita, riprovare più tardi.',
    timeout: 10000
  }; /// </a>

  /// <b>
  const errors = utils.useExpressValidator(req, warnMessage);
  if (errors) {
    res.status(422).json({ errors });
    return next();
  }
  /// </b>

  const { name, lastname, age } = req.body;
  const user = req.user.id;
  /// CONTROLLARE SE l'user ha gia un profilo
  let existingProfile;
  try {
    existingProfile = await Profile.findOne({ user });
  } catch (err) {
    console.log('KO 3');
    res.status(500).json({ errors: [errorMessage] });
    return next();
  }

  if (existingProfile) {
    warnMessage.msg = `Un Profilo per questo utente già esiste`;
    res.status(400).json({ errors: [warnMessage] });
    return next();
  }

  const profile = {};
  profile.user = user;
  if (name) {
    profile.name = name;
  }
  if (lastname) {
    profile.lastname = lastname;
  }
  if (age) {
    profile.age = age;
  }

  /// Salva il nuovo Profilo nel database
  const createdProfile = new Profile(profile);

  try {
    await createdProfile.save();
  } catch (err) {
    res.status(500).json({ errors: [errorMessage] });
    return next();
  }

  const location = `${req.protocol}://${req.get('host')}${req.baseUrl}${
    req.path
  }/${createdProfile._id}`;

  res.setHeader('Location', location);
  res.status(201).json({ ...profile, _id: createdProfile._id });
  return next();
};

/**
 * @route   GET /api/profile/:id
 * @desc    Recupera un profilo tramite il suo id passato come parametro dell'url
 * @webpage /profile
 * @action  readProfile
 * @access  public
 * @argument {string} req.params.id - id del profile
 * @returns {Json} - documento completo
 * <a> Controlla se l'id è valido altrimenti passa al prossimo middleware.
 * <a> Object di messaggi che vengono inviati al client per mostrare gli Alert.
 * <c> Ottiene un profile tramite il suo id passato come parametro dell'url
 */
const readProfile = async (req, res, next) => {
  req.userAction = 'Get Profile';

  /// <a>
  const errorMessage = {
    type: 'error',
    title: 'Errore Profilo',
    msg: 'Impossibile visualizzare il Profilo.',
    timeout: 10000
  };

  const warningMessage = {
    type: 'warning',
    title: 'Errore Profilo',
    msg: 'Il Profilo cercato non esiste.',
    timeout: 10000
  };

  const infoMessage = {
    type: 'info',
    title: 'Info Profilo',
    msg: 'Il Profilo cercato non esiste 2.',
    timeout: 10000
  }; /// </a>

  /// <b>
  const id = req.params.id;
  if (id.length < 24) {
    console.log('OOOOOKKKKK 123');
    res.status(500).json({ errors: [infoMessage] });
    return next();
  } /// </b>

  /// <c>
  let profilePopulated;
  try {
    profilePopulated = await Profile.findById(id).populate('user', ['email']);
  } catch (err) {
    res.status(500).json({ errors: [errorMessage] });
    return next();
  }

  if (!profilePopulated) {
    res.status(500).json({ errors: [warningMessage] });
    return next();
  } /// </c>

  res.status(201).json(profilePopulated);
  return next();
};

/**
 * @route   PUT api/profile/:id
 * @desc    aggiorna profilo
 * @webpage /profile/:id
 * @action  updateProfile
 * @access  private
 * @returns {Json} profile
 * [a] Cerca il profilo da aggiornare:
 *      _id: profile.id ricevuto da url.
 *      $set: se il campo worked non esiste lo crea.
 *      new: se `true`, restituisce il documento modificato anziché l'originale,
 *           il valore predefinito è false
 * [b] Nel documento users cambia aggiorna i valori ....
 * [c] salva il documento aggiornato.
 */
const updateProfile = async (req, res) => {
  req.userAction = 'Update Profile';

  /// <a> MESSAGES
  const errorMessage = {
    type: 'error',
    title: 'Errore Modifica Profilo',
    msg: 'Impossibile modificare il Profilo. Riprovare più tardi',
    timeout: 10000
  };

  const successMessage = {
    type: 'success',
    title: 'Profilo Modificato',
    msg: 'Il Profilo è stato modificato con successo',
    timeout: 10000
  }; /// </a>

  try {
    const { name, lastname, age } = req.body;
    const profile = await Profile.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { name, lastname, age } },
      { new: true }
    );
    //   return res.json(profile);

    const location = `${req.protocol}://${req.get('host')}${req.baseUrl}${
      req.path
    }/${profile._id}`;
    res.setHeader('Location', location);
    res.status(201).json(profile);
    return next();
  } catch (err) {
    // console.log(err.message);
    res.status(500).json({ errors: [errorMessage] });
    return next();
  }
};

/**
 * @route   DELETE /api/profile/:id
 * @desc    Cancella un profile tramite il suo id passato come parametro dell'url
 * @webpage /profile
 * @action  deleteProfile
 * @access  Private
 * @argument {string} req.params.id - id del profile
 * @returns {Json} - messaggio di successo
 * <a> Object di messaggi che vengono inviati al client per mostrare gli Alert.
 * <b> Controlla se l'id è valido altrimenti passa al prossimo middleware.
 * <c> Ottiene e cancella un profile tramite il suo id passato come parametro dell'url.
 */
const deleteProfile = async (req, res, next) => {
  req.userAction = 'Delete Profile';

  /// <a> MESSAGES
  const errorMessage = {
    type: 'error',
    title: 'Errore Profilo',
    msg: 'Impossibile cancellare il Profilo. Riprovare più tardi',
    timeout: 10000
  };

  const successMessage = {
    type: 'success',
    title: 'Success',
    msg: 'Il Profilo è stato eliminato con successo',
    timeout: 10000
  }; /// </a>

  /// <b>
  const id = req.params.id;
  if (id.length < 24) {
    return next();
  } /// </b>

  /// <c>
  Profile.findByIdAndRemove(id, function (err, response) {
    if (err || !response) {
      res.status(500).json({ errors: [errorMessage] });
      return next();
    }
    res.status(200).json({ errors: [successMessage] });
    return next();
  }); /// </c>
};

exports.test = test;
exports.createProfile = createProfile;
exports.readProfile = readProfile;
exports.updateProfile = updateProfile;
exports.deleteProfile = deleteProfile;
