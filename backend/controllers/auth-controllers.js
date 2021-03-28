const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const sendEmailAuth = require('../config/transporter');
const utils = require('../utils/functions');

// const HttpError = require('../models/http-error');
const User = require('../models/User');

/*
nella path /password_reset
inserire l email dmanzi83@gmail.com
viene inviata email con link da cliccare


nella path
/password_reset/ABJH4UNSUGJAB776FROUHXS6TLOA5BFFMVWWC2LMWJSG2YLOPJUTQM2AM5WWC2LMFZRW63NFMZXXEY3FYKZXI53PL5TGCY3UN5ZF65TFOJUWM2LFMTBLUZTPOJRWKZC7O5SWC227OBQXG43XN5ZGIX3SMVZWK5GC
bisogna inserire 2 volte la nuova password
e al click del bottone si viene reindirizzati nella pagina del login
*/

/**
 * @route    POST /api/auth/register
 * @desc     Register/Signup a User con name, email, password
 * @webpage  /register
 * @action   register
 * @access   Public
 * @argument {Object} req.body
 * @argument {string} body.name
 * @argument {string} body.email
 * @argument {string} body.password
 * @returns {String} stringa json con i valori: name, email, role.
 * <a> Messaggi per mostrare gli Alert lato client.
 * <b> Controlla se il middleware `express-validator` ha trovato errori
 * ### sui valori: username, email, password.
 * <c> Controlla Se l'email non è già presente nel db.
 * <d> Genera un avatar. @see https://www.npmjs.com/package/gravatar-url
 * <e> Assegna un ruolo all'user tra: system, admin, user
 * <f> Viene fatto l'Encrypt della password.
 * <g> Viene fatto l'Encrypt del codice verify.
 * <h> Salva il nuovo user nel db assegnandogli un id.
 * <i> Invia email all' user per verificare e attivare il suo account.
 * ? Settare i cookie per la parte di verifica dell'account ?
 */
const register = async (req, res, next) => {
  req.userAction = 'Register';

  /// <a> MESSAGES
  const errorMessage = {
    type: 'error',
    title: 'Errore Server',
    msg: 'Si è verificato un errore, riprovare piu tardi.',
    timeout: 10000,
  };

  const warnMessage = {
    type: 'warning',
    title: 'Errore Registrazione',
    msg: 'Credenziali non valide, impossibile accedere.',
    timeout: 10000,
  }; /// </a>

  /// <b>
  const errors = utils.useExpressValidator(req, warnMessage);
  if (errors) {
    res.status(422).json({ errors });
    return next();
  }
  /// </b>

  const { username, email, password } = req.body;

  /// <c>
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    console.log('==========');
    console.log('OK 1');
    res.status(500).json({ errors: [errorMessage] });
    console.log('OK 2');
    console.log('==========');
    return next();
  }

  if (existingUser) {
    warnMessage.msg = `Un utente con l' email ${email} è già registrato`; // da eliminare?
    res.status(403).json({ errors: [warnMessage] });
    return next();
  } /// </c>

  /// <d> Crea l'avatar
  const avatar = gravatar.url(email, {
    s: '80',
    d: 'retro',
    r: 'pg',
  }); /// </d>

  /// <e> Setta il ruolo
  let totalUser;
  try {
    totalUser = await User.countDocuments();
  } catch (error) {
    console.log('OK 3');
    res.status(500).json({ errors: [errorMessage] });
    return next();
  }
  const role = !totalUser ? 'system' : totalUser === 1 ? 'admin' : 'user';
  /// </e>

  /// <f> Fa l' hash della password
  const hashedPassword = await utils.createHash(password);
  if (!hashedPassword) {
    console.log('OK 4');
    res.status(500).json({ errors: [errorMessage] });
    return next();
  } /// </f>

  /// <g> Crea l' hash per il codice verify
  const verify = await utils.createHash(new Date().toString(), true);
  if (!verify) {
    console.log('OK 5');
    res.status(500).json({ errors: [errorMessage] });
    return next();
  } /// </g>

  /// <h> Salva il nuovo utente nel database
  const createdUser = new User({
    username,
    email,
    avatar,
    password: hashedPassword,
    verify,
    role,
  });

  try {
    await createdUser.save();
  } catch (err) {
    console.log('OK 6');
    res.status(500).json({ errors: [errorMessage] });
    return next();
  } /// </h>

  /// <i> Invia email all' user per successiva attivazione del suo account
  const isSent = await sendEmailAuth(
    email,
    'verify',
    verify,
    'Attivazione Account',
    '<p>Clicca il bottone per attivare il tuo account.</p><br>'
  );

  if (!isSent) {
    console.log('OK 7');
    res.status(500).json({ errors: [errorMessage] });
    return next();
  } /// </i>

  res.status(201).json({
    username: createdUser.username,
    email: createdUser.email,
    role: createdUser.role,
  });
  return next();
};

/**
 * @route   POST api/auth/verify [AUTENTICA]
 * @desc    Compara il codice verify salvato nel db con quello che l'utente ha ricevuto per email
 * @webpage /register
 * @action  register
 * @access  Public
 * @argument {Object} req.body
 * @argument {string} req.body.hash - hash verify inviato all'email dell'utente
 * @returns {String} stringa json con i valori: id,name,email,role,Token JWT.
 * <m> Object di messaggi che vengono inviati al client per mostrare gli Alert.
 * <a> Controlla se il middleware `express-validator` ha trovato errori
 * ### sul valore: hash.
 * <b> Cerca il documento dell' user tramite il valore di `verify`,
 * ### attiva il suo account settando `isActive` a true,
 * ### `isAuthenticated: 0,`
 * ### aggiorna la data dell'autenticazione nel campo `login_at`
 * [c] Ritorna: id, name, email, role, token.
 */
const verification = async (req, res, next) => {
  req.userAction = 'Verification';

  /// <m> MESSAGES
  const errorMessage = {
    type: 'error',
    title: 'Errore Verification',
    msg: 'Si è verificato un errore, riprovare più tardi.',
    timeout: 10000,
  }; /// </m>

  /// <a>
  const errors = utils.useExpressValidator(req, errorMessage);
  if (errors) {
    res.status(422).json({ errors });
    return next();
  }
  /// </a>

  /*   /// <a>
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array()[0]);
    warnMessage.msg = errors.array()[0].msg;
    res.status(422).json({ errors: [warnMessage] });
    return next();
  } /// </a> */

  const verify = req.body.hash;

  /// <b>
  let user;
  try {
    user = await User.findOneAndUpdate(
      { verify: verify },
      { isActive: true, isAuthenticated: 1, login_at: new Date() },
      { new: true }
    );
  } catch (error) {
    res.status(500).json({ errors: [errorMessage] });
    return next();
  }

  if (!user) {
    res.status(500).json({ errors: [errorMessage] });
    return next();
  } /// </b>

  /// [c] Ritorna: id, name, email, role, token
  utils.createTokenJwt(user, errorMessage, res);
  next();
};

/**
 * @route   GET /api/auth [AUTENTICA]
 * @desc    Recupera i dati dell'utente tramite il token JWT
 * @webpage /
 * @action  loadUser
 * @access  Private
 * @argument {Object} req.user
 * @argument {string} req.user.id - id estratto dal token JWT
 * @returns {Json} - {username, email, avatar, role}
 * <m> Object di messaggi che vengono inviati al client per mostrare gli Alert.
 * <a> Autentica l'utente tramite il suo id recuperato dal token JWT
 */
const loadUser = async (req, res, next) => {
  req.userAction = 'Load User';

  /// <m> MESSAGES
  const errorMessage = {
    type: 'error',
    title: 'Errore Autorizzazione',
    msg: 'Autorizzazione fallita, impossibile accedere.',
    timeout: 10000,
  }; /// </m>

  /// <a>
  const id = req.user.id;
  let user;
  try {
    user = await User.findById(id).select('-password');
  } catch (err) {
    res.status(500).json({ errors: [errorMessage] });
    return next();
  }

  if (!user) {
    res.status(500).json({ errors: [errorMessage] });
    return next();
  } /// </a>

  res.status(201).json({
    token: user.token,
    id: user._id,
    username: user.username,
    email: user.email,
    avatar: user.avatar,
    role: user.role,
    isActive: user.isActive,
    isAuthenticated: user.isAuthenticated,
    login_at: user.login_at.toLocaleDateString(),
    logout_at: user.logout_at.toLocaleDateString(),
    register_at: user.register_at.toLocaleDateString(),
  });
  next();
};

/**
 * @route    POST api/auth/login [AUTENTICA]
 * @desc     Login/Signin. Autenticazione dell' user con email e password
 * @webpage  /login
 * @action   login
 * @access   Public
 * @argument {Object} req.body
 * @argument {string} req.body.email
 * @argument {string} req.body.password
 * @returns  {String} - json con i valori: id, username, email, role, Token JWT.
 * <m> Object di messaggi che vengono inviati al client per mostrare gli Alert.
 * <a> Controlla se il middleware `express-validator` ha trovato errori
 * ### sui valori: email, password.
 * <b> Con l'email inserita dall'utente cerca il suo documento nel db.
 * <c> Confronta la password inserita dall'utente con quella nel database.
 * <d> Se l'account non è stato ancora attivato.
 *     Invia una nuova email all'utente per attivarlo.
 * <e> Aggiorna la data del login.
 * [f] Genera il Token JWT e lo invia al frontend.
 */
const login = async (req, res, next) => {
  req.userAction = 'Login';

  /// <m> MESSAGES
  const errorMessage = {
    type: 'error',
    title: 'Errore Server',
    msg: 'Si è verificato un errore, riprovare piu tardi.',
    timeout: 10000,
  };

  const warnMessage = {
    type: 'warning',
    title: 'Errore Login',
    msg: 'Credenziali non valide, impossibile accedere.',
    timeout: 10000,
  };

  const infoMessage = {
    type: 'info',
    title: 'Account non Attivato',
    msg: `L' account non è stato ancora attivato,
Per attivarlo clicca il bottone nel messaggio che ti
è stato inviato alla tua email.`,
    timeout: 10000,
  }; /// </m>

  /// <a>
  const errors = utils.useExpressValidator(req, warnMessage);
  if (errors) {
    res.status(422).json({ errors });
    return next();
  }
  /// </a>

  /*   /// <a>
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array()[0]);
    warnMessage.msg = errors.array()[0].msg;
    res.status(422).json({ errors: [warnMessage] });
    return next();
  } /// </a> */

  const { email, password } = req.body;

  /// <b> Controlla se l'utente è già registrato
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    res.status(500).json({ errors: [errorMessage] });
    return next();
  }

  if (!existingUser) {
    res.status(403).json({ errors: [warnMessage] });
    return next();
  }
  req.userid = existingUser._id;
  /// </b>

  /// <c> Controlla se la password è giusta
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    res.status(500).json({
      errors: [errorMessage],
    });
    return next();
  }

  if (!isValidPassword) {
    res.status(403).json({
      errors: [warnMessage],
    });
    return next();
  } /// </c>

  /// <d> Se l'account non è stato ancora attivato
  if (!existingUser.isActive) {
    /// Invia email all' user per attivare il suo account

    /// <h> Invia email all' user per successiva attivazione del suo account
    const isSent = await sendEmailAuth(
      email,
      'verify',
      existingUser.verify,
      'Attivazione Account',
      '<p>Clicca il bottone per attivare il tuo account.</p><br>'
    );

    if (!isSent) {
      errorMessage.msg = `email non inviata a ${email}`;
      res.status(500).json({ errors: [errorMessage] });
      return next();
    } /// </h>

    res.status(403).json({ errors: [infoMessage] });
    return next();
  } /// </d>

  /// <e> aggiornare la data del login
  existingUser.login_at = Date();
  existingUser.isAuthenticated = 1;
  existingUser.save(function (err) {
    if (err) {
      res.status(500).json({ errors: [errorMessage] });
      return next();
    }
  }); /// </e>

  /// [f] Ritorna id, nome, email, role, tokenJWT
  utils.createTokenJwt(existingUser, errorMessage, res);
  next();
};

/**
 * @route   PUT /api/auth/logout
 * @desc    Logout
 * @webpage /logout
 * @action  logout
 * @access  Private
 * @argument {Object} req.user
 * @argument {string} req.user.id
 * @returns  {String} - json messaggio di successo
 * <m> Object di messaggi che vengono inviati al client per mostrare gli Alert.
 * <a> Fa il logout dell'utente tramite il suo id recuperato dal token JWT
 */
const logout = async (req, res, next) => {
  req.userAction = 'Logout';

  /// <m> MESSAGES
  const errorMessage = {
    type: 'error',
    title: 'Errore Server',
    msg: 'Si è verificato un errore, riprovare piu tardi.',
    timeout: 10000,
  }; /// </m>

  /// <a>
  const id = req.user.id;
  let user;
  try {
    user = await User.findByIdAndUpdate(
      id,
      {
        isAuthenticated: 0,
        logout_at: new Date(),
      },
      { new: true }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [errorMessage] });
    return next();
  }

  if (!user) {
    res.status(500).json({ errors: [errorMessage] });
    return next();
  } /// </a>

  res.status(201).json({ msg: 'Logout avvenuto con successo' });
  next();
};

/**
 * @route   POST api/auth/reset-password
 * @desc    L'utente ha dimenticato la sua password,
 *          ma con l'email puo crearne una nuova
 * @webpage /reset-password
 * @action  resetPassword
 * @access  Public
 * @argument {Object} req.body
 * @argument {string} req.body.email
 * @returns {String} stringa json con i valori: email
 * <m> Object di messaggi che vengono inviati al client per mostrare gli Alert.
 * <a> Controlla se il middleware `express-validator` ha trovato errori
 * ### sul valore: email.
 * <b> Viene creata una nuova hash per il campo verify del documento.
 * <c> tramite l' email aggiorna i valori dei campi `isActive` a false
 *     e `verify` con il codice hash generato prima.
 * <d> Invia all'email dell'utente un messaggio con link al suo interno che
 *     porta a una sezione dell'app per creare una nuova password.
 * [!] ritornare l'email per settare i cookie o solo un messaggio ?
 */
const resetPassword = async (req, res, next) => {
  req.userAction = 'Reset Password';

  /// <m> MESSAGES
  const errorMessage = {
    type: 'error',
    title: 'Errore Reset Password',
    msg: 'Si è verificato un errore, riprovare più tardi.',
    timeout: 10000,
  };

  const warnMessage = {
    type: 'warning',
    title: 'Errore Reset Password',
    msg: 'è richiesta un email valida',
    timeout: 10000,
  }; /// </m>

  /// <a>
  const errors = utils.useExpressValidator(req, warnMessage);
  if (errors) {
    res.status(422).json({ errors });
    return next();
  }
  /// </a>

  /// <b> Genera un nuovo codice hash per il campo verify
  const verify = await utils.createHash(new Date().toString(), true);
  if (!verify) {
    res.status(500).json({ errors: [errorMessage] });
    return next();
  } /// </b>

  /// <c>
  const { email } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOneAndUpdate(
      { email: email },
      { isActive: false, verify: verify },
      { new: true }
    );
  } catch (error) {
    res.status(500).json({ errors: [errorMessage] });
    return next();
  }

  if (!existingUser) {
    warnMessage.msg = `Non ci sono utenti registrati con l' email ${email}. Riprova con un'altra email.`;
    res.status(400).json({ errors: [warnMessage] });
    return next();
  } /// </c>

  /// <d>
  const isSent = await sendEmailAuth(
    email,
    'new-password',
    verify,
    'Password Dimenticata',
    '<p>Clicca il bottone per creare una nuova password.</p><br>'
  );

  if (!isSent) {
    errorMessage.msg = `email non inviata a ${email}`;
    res.status(500).json({ errors: [errorMessage] });
    return next();
  } /// </d>

  res.status(201).json({ email: existingUser.email }); /// [!]
  next();
};

/**
 * @route   POST api/auth/new-password
 * @desc    Salva la nuova password. [Logga]
 * @webpage /new-password
 * @action  newPassword
 * @access  Public
 * @argument {Object} body
 * @argument {string} body.hash
 * @argument {string} body.password
 * @returns {String} stringa json con i valori: id,username,email,role,Token JWT
 * <m> Object di messaggi che vengono inviati al client per mostrare gli Alert.
 * <a> Controlla se il middleware `express-validator` ha trovato errori
 *     sui valori: hash, password.
 * [b] Fa l' hash della password
 * <c> Cerca l'utente tramite l'hash e aggiorna il documento dell'utente
 *     con la nuova password e setta il campo `isActive` a true.
 * [d] Crea il Token JWT che viene inviato al client per autenticare l'utente.
 * [?] // ? Settare i cookie ?
 */
const newPassword = async (req, res, next) => {
  req.userAction = 'New Password';

  /// <m> MESSAGES
  const errorMessage = {
    type: 'error',
    title: 'Errore New Password',
    msg: 'Si è verificato un errore, riprovare più tardi.',
    timeout: 10000,
  }; /// </m>

  /// <a>
  const errors = utils.useExpressValidator(req, errorMessage);
  if (errors) {
    res.status(422).json({ errors });
    return next();
  }
  /// </a>

  const { hash, password } = req.body;

  /// [b] Fa l' hash della password
  const hashedPassword = await utils.createHash(password);
  if (!hashedPassword) {
    res.status(500).json({ errors: [errorMessage] });
    return next();
  }

  // TODO: Creare un nuovo codice verify ?

  /// <c>
  let user;
  try {
    user = await User.findOneAndUpdate(
      { verify: hash },
      { $set: { isActive: true, password: hashedPassword } },
      { new: true }
    );
  } catch (error) {
    res.status(500).json({ errors: [errorMessage] });
    return next();
  } /// </c>

  if (!user) {
    console.log(789);
    res.status(500).json({ errors: [errorMessage] });
    return next();
  } /// </b>

  /// [d] Crea il Token e ritorna id, username, email, role, token
  utils.createTokenJwt(user, errorMessage, res);
  next();
};

/**
 * @route   DELETE api/auth
 * @desc    Cancella il proprio account e tutto ciò che è correlato ad esso
 * @webpage /profile
 * @action  deleteAccount
 * @access  Private
 * @argument {Object} req.user
 * @argument {string} req.user.id
 * @returns {String} - messaggio di avvenuta cancellazione
 * <m> Object di messaggi che vengono inviati al client per mostrare gli Alert.
 * <t> Il middleware auth controlla se il token c'è e se è valido.
 * <a> Cerca e cancella il doc dell'utente tramite l'id recuperato dal token.
 */
const deleteAccount = async (req, res, next) => {
  req.userAction = 'Delete Account';
  const id = req.user.id;

  /// <m> MESSAGES
  const errorMessage = {
    type: 'error',
    title: 'Errore Cancellazione',
    msg: 'Cancellazione non riuscita, riprovare più tardi.',
    timeout: 10000,
  }; /// </m>

  /// <a>
  User.findByIdAndRemove(id, function (err, response) {
    if (err || !response) {
      res.status(500).json({ errors: [errorMessage] });
      return next();
    }
    res.status(200).json('Cancellato account con id: ' + id);
    return next();
  }); /// </a>
};

/**
 * @route   [1] GET /api/auth/test
 * @desc    TEST
 * @webpage /
 * @action  test
 * @access  Public
 * @returns {String}
 */
const test = async (req, res, next) => {
  req.userAction = 'Login';
  res.status(201).send('ooookkkk');
  next();
};

exports.register = register;
exports.verification = verification;
exports.loadUser = loadUser;
exports.login = login;
exports.logout = logout;
exports.resetPassword = resetPassword;
exports.newPassword = newPassword;
exports.deleteAccount = deleteAccount;
exports.test = test;
