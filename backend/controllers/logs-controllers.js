const faker = require('faker');
const Log = require('../models/Log');

/**
 * @route   POST api/logs/fake
 * @desc    crea logs finti
 * @webpage /logs/fake
 * @action  createFakeLogs
 * @access  Private
 * @returns {String} stringa json.
 */
const createFakeLogs = async (req, res, next) => {
  req.userAction = 'Create Fake Logs';
  /// <m>
  const errorMessage = {
    type: 'error',
    title: 'Errore Server',
    msg: 'Si è verificato un errore, riprovare piu tardi.',
    timeout: 10000
  }; /// </m>

  const number = req.body.number;

  if (!number) {
    res.status(500).json({ msg: [errorMessage] });
    return next();
  }

  const reqTypes = [
    { method: 'POST', action: 'Create Resource' },
    { method: 'GET', action: 'Read Resource' },
    { method: 'PUT', action: 'Update Resource' },
    { method: 'DELETE', action: 'Delete Resource' }
  ];

  const codes = [200, 201, 400, 403, 422, 500];
  const routes = ['/api/auth', '/api/user', '/api/post'];

  let arr = [];
  for (let i = 0; i < number; i++) {
    const reqTypesIndex = Math.floor(Math.random() * reqTypes.length);
    const obj = {
      method: reqTypes[reqTypesIndex].method,
      code: codes[Math.floor(Math.random() * codes.length)],
      route: routes[Math.floor(Math.random() * routes.length)],
      action: reqTypes[reqTypesIndex].action,
      ip: faker.internet.ip(),
      time: Math.floor(Math.random() * 5000),
      date: faker.date.between(faker.date.past(), faker.date.recent()),
      isFake: true
    };
    arr.push(obj);
  }

  Log.insertMany(arr, function(error, docs) {
    if (error) {
      res.status(500).json({ msg: [errorMessage] });
      return next();
    }
    // console.log(docs);
    res.status(200).json(arr);
    return next();
  });
};

/**
 * @route   GET api/logs
 * @desc    Ottiene tutti i log
 * @webpage /logs
 * @action  getLogs
 * @access  Private
 * @return  Logs
 */
const getLogs = async (req, res, next) => {
  /// <m>
  const errorMessage = {
    type: 'error',
    title: 'Errore Server',
    msg: 'Si è verificato un errore, riprovare piu tardi.',
    timeout: 10000
  }; /// </m>w

  try {
    const logs = await Log.find().lean();
    console.log('Get all Logs');
    res.status(200).json(logs);
    return next();
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: [errorMessage] });
    return next();
  }
};

/**
 * @route   GET /api/logs/:id
 * @desc    Recupera un log tramite il suo id passato come parametro dell'url
 * @webpage /logs
 * @action  getLog
 * @access  Private
 * @argument {string} req.params.id - id del log
 * @returns {Json} - documento completo
 * <a> Controlla se l'id è valido altrimenti passa al prossimo middleware.
 * <b> Object di messaggi che vengono inviati al client per mostrare gli Alert.
 * <c> Ottiene un log tramite il suo id passato come parametro dell'url
 */
const getLog = async (req, res, next) => {
  /// <a>
  const id = req.params.id;
  if (id.length < 24) {
    return next();
  } /// </a>

  /// <b>
  const errorMessage = {
    type: 'error',
    title: 'Errore Log',
    msg: 'Impossibile visualizzare il Log.',
    timeout: 10000
  }; /// </b>

  /// <c>
  let log;
  try {
    log = await Log.findById(id).lean();
  } catch (err) {
    res.status(500).json({ errors: [errorMessage] });
    return next();
  }

  if (!log) {
    res.status(500).json({ errors: [errorMessage] });
    return next();
  } /// </c>

  res.status(201).json(log);
  next();
};

/**
 * @route   DELETE /api/logs/:id
 * @desc    Cancella un log tramite il suo id passato come parametro dell'url
 * @webpage /logs
 * @action  deleteLog
 * @access  Private
 * @argument {string} req.params.id - id del log
 * @returns {Json} - messaggio di successo
 * <m> Object di messaggi che vengono inviati al client per mostrare gli Alert.
 * <a> Controlla se l'id è valido altrimenti passa al prossimo middleware.
 * <b> Ottiene un log tramite il suo id passato come parametro dell'url
 */
const deleteLog = async (req, res, next) => {
  console.log('deleteLog');
  /// <a>
  const id = req.params.id;
  if (id.length < 24) {
    return next();
  } /// </a>

  /// <m> MESSAGES
  const errorMessage = {
    type: 'error',
    title: 'Errore Log',
    msg: 'Impossibile cancellare il Log.',
    timeout: 10000
  }; /// </m>

  /// <b>
  Log.findByIdAndRemove(id, function(err, response) {
    if (err || !response) {
      res.status(500).json({ errors: [errorMessage] });
      return next();
    }
    res.status(200).json({ msg: 'Cancellato il Log con id: ' + id });
    return next();
  }); /// </b>
};

/**
 * @route   DELETE /api/logs
 * @desc    Cancella tutti i log
 * @webpage /logs
 * @action  deleteLogs
 * @access Private
 * @returns {Json} messaggio di successo
 * <m> Object di messaggi che vengono inviati al client per mostrare gli Alert.
 */
const deleteLogs = async (req, res, next) => {
  console.log('deleteLogs');

  /// <m> MESSAGES
  const errorMessage = {
    type: 'error',
    title: 'Errore Log',
    msg: 'Impossibile cancellare il Log.',
    timeout: 10000
  }; /// </m>

  /// <a>
  try {
    const log = await Log.deleteMany({});
    res.status(200).json({
      msg: 'Sono stati cancellati tutti i ' + log.deletedCount + ' Log.'
    });
    return next();
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ errors: [errorMessage] });
    return next();
  } /// </a>
};

/**
 * @route   DELETE /api/logs/fake
 * @desc    Cancella tutti i log finti
 * @webpage /logs
 * @action  deleteFakeLogs
 * @access Private
 * @returns {Json} messaggio di successo
 * <m> Object di messaggi che vengono inviati al client per mostrare gli Alert.
 */
const deleteFakeLogs = async (req, res, next) => {
  console.log('deleteFakeLogs');
  const type = +req.body.type;
  console.log('TYPE', typeof type);
  const query = !type ? {} : type === 1 ? { isFake: false } : { isFake: true };

  /// <m>
  const errorMessage = {
    type: 'error',
    title: 'Errore Log',
    msg: 'Impossibile cancellare il Log.',
    timeout: 10000
  }; /// </m>

  /// <a>
  try {
    const log = await Log.deleteMany(query);
    res.status(200).json({
      msg: 'Sono stati cancellati tutti i ' + log.deletedCount + ' finti Log.'
    });
    return next();
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ errors: [errorMessage] });
    return next();
  } /// </a>
  // next();
};

/**
 * @route   [1] GET /api/logs/test
 * @desc    TEST
 * @webpage /
 * @action  test
 * @access  Public
 * @returns {String}
 */
const test = async (req, res, next) => {
  res.status(201).send('LOGS');
  next();
};

exports.createFakeLogs = createFakeLogs;
exports.getLogs = getLogs;
exports.getLog = getLog;
exports.deleteLog = deleteLog;
exports.deleteLogs = deleteLogs;
exports.deleteFakeLogs = deleteFakeLogs;
exports.test = test;
