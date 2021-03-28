const Post = require('../models/Post');
const User = require('../models/User');
const utils = require('../utils/functions');

/**
 * @route   [1] GET /api/post/test
 * @desc    TEST
 * @webpage /
 * @action  test
 * @access  Public
 * @returns {String}
 */
const test = async (req, res, next) => {
  req.userAction = 'Test Post';
  res.status(201).send('TEST POST');
  return next();
};

/**
 * @route   POST api/post
 * @desc    l'admin crea un nuovo a utente con: name, email, password
 * @webpage /post/create
 * @action  createPost
 * @access  private
 * @returns {String} stringa json con i valori: id,title,text,tags.
 *   req: invia al server i parametri del body(name, email, password).
 *   res: ritorna la risposta dal server.
 * Vengono eseguiti i seguenti controlli sui valori inseriti dall'utente:
 * [a] `validationResult` check la validità dei valori(title,text).
 * [b] Se il titolo è già presente nel database ritorna un errore.
 * [d] Crea un documento Post con i valori:title,text,tags.
 * [f] Col metodo `save` viene salvato il nuovo articolo nel db assegnandogli un id.
 */
const createPost = async (req, res, next) => {
  req.userAction = 'Create Post';

  /// <m>
  const errorMessage = {
    type: 'error',
    title: 'Errore Creazione Post',
    msg: 'Creazione Post non riuscita, riprovare più tardi.',
    timeout: 10000
  };

  const warnMessage = {
    type: 'warning',
    title: 'Errore Creazione Post',
    msg: 'Creazione Post non riuscita, riprovare più tardi.',
    timeout: 10000
  }; /// </m>

  /// <a>
  const errors = utils.useExpressValidator(req, warnMessage);
  if (errors) {
    res.status(422).json({ errors });
    return next();
  }
  /// </a>

  const { title, text, tags } = req.body;

  let existingPost;
  try {
    existingPost = await Post.findOne({ title });
  } catch (err) {
    console.log('KO 3');
    res.status(500).json({ errors: [errorMessage] });
    return next();
  }

  if (existingPost) {
    warnMessage.msg = `Un Post con il titolo "${title}" già esiste`;
    res.status(400).json({ errors: [warnMessage] });
    return next();
  }

  /// Salva il nuovo Post nel database
  const createdPost = new Post({
    user: req.user.id,
    title,
    text,
    tags
  });

  try {
    await createdPost.save();
  } catch (err) {
    res.status(500).json({ errors: [errorMessage] });
    return next();
  }

  /// <a>
  // console.log('USER ID', req.user.id);
  // console.log('POST ID', createdPost._id);
  let user;
  try {
    user = await User.findByIdAndUpdate(req.user.id, {
      $addToSet: { posts: createdPost._id }
    });
  } catch (err) {
    // console.log('KO 1');
    res.status(500).json({ errors: [errorMessage] });
    return next();
  }

  if (!user) {
    console.log('KO 2');
    res.status(500).json({ errors: [errorMessage] });
    return next();
  } /// </a>

  const location = `${req.protocol}://${req.get('host')}${req.baseUrl}${
    req.path
  }/${createdPost._id}`;

  res.setHeader('Location', location);
  res.status(201).json({
    title: createdPost.title,
    text: createdPost.text,
    tags: createdPost.tags
  });
  return next();
};

/**
 * @route   GET /api/post/:id
 * @desc    Recupera un post tramite il suo id passato come parametro dell'url
 * @webpage /post
 * @action  readPost
 * @access  public
 * @argument {string} req.params.id - id del post
 * @returns {Json} - documento completo
 * <a> Controlla se l'id è valido altrimenti passa al prossimo middleware.
 * <a> Object di messaggi che vengono inviati al client per mostrare gli Alert.
 * <c> Ottiene un post tramite il suo id passato come parametro dell'url
 */
const readPost = async (req, res, next) => {
  req.userAction = 'Get Post';

  /// <a>
  const errorMessage = {
    type: 'error',
    title: 'Errore Post',
    msg: 'Impossibile visualizzare il Post.',
    timeout: 10000
  };

  const warningMessage = {
    type: 'warning',
    title: 'Errore Post',
    msg: 'Il Post cercato non esiste.',
    timeout: 10000
  };

  const infoMessage = {
    type: 'info',
    title: 'Info Post',
    msg: 'Il Post cercato non esiste 2.',
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
  let post;
  try {
    post = await Post.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    )
      .populate('user', ['name', 'email', 'avatar'])
      .populate('comments.user', ['name', 'email', 'avatar']);
  } catch (err) {
    res.status(500).json({ errors: [errorMessage] });
    return next();
  }

  if (!post) {
    res.status(500).json({ errors: [warningMessage] });
    return next();
  } /// </c>

  res.status(201).json(post);
  return next();
};

/**
 * @route   PUT api/post/:id
 * @desc    update post
 * @webpage /post/:id
 * @action  updatePost
 * @access  Private
 * @returns {Json} post
 * [a] Cerca il post da aggiornare:
 *      _id: post.id ricevuto da url.
 *      $set: se il campo worked non esiste lo crea.
 *      new: se `true`, restituisce il documento modificato anziché l'originale,
 *           il valore predefinito è false
 * [b] Nel documento users cambia aggiorna i valori ....
 * [c] salva il documento aggiornato.
 */
const updatePost = async (req, res) => {
  req.userAction = 'Update Post';

  /// <a> MESSAGES
  const errorMessage = {
    type: 'error',
    title: 'Errore Modifica Post',
    msg: 'Impossibile modificare il Post. Riprovare più tardi',
    timeout: 10000
  };

  const successMessage = {
    type: 'success',
    title: 'Post Modificato',
    msg: 'Il Post è stato modificato con successo',
    timeout: 10000
  }; /// </a>

  try {
    const { title, text, tags } = req.body;
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { title: title, text: text, tags: tags } },
      { new: true }
    );
    //   return res.json(post);

    const location = `${req.protocol}://${req.get('host')}${req.baseUrl}${
      req.path
    }/${post._id}`;
    res.setHeader('Location', location);
    res.status(201).json(post);
    return next();
  } catch (err) {
    // console.log(err.message);
    res.status(500).json({ errors: [errorMessage] });
    return next();
  }
};

/**
 * @route   DELETE /api/post/:id
 * @desc    Cancella un post tramite il suo id passato come parametro dell'url
 * @webpage /post
 * @action  deletePost
 * @access  Private
 * @argument {string} req.params.id - id del post
 * @returns {Json} - messaggio di successo
 * <a> Object di messaggi che vengono inviati al client per mostrare gli Alert.
 * <b> Controlla se l'id è valido altrimenti passa al prossimo middleware.
 * <c> Ottiene e cancella un post tramite il suo id passato come parametro dell'url.
 */
const deletePost = async (req, res, next) => {
  req.userAction = 'Delete Post';

  /// <a> MESSAGES
  const errorMessage = {
    type: 'error',
    title: 'Errore Post',
    msg: 'Impossibile cancellare il Post. Riprovare più tardi',
    timeout: 10000
  };

  const successMessage = {
    type: 'success',
    title: 'Success',
    msg: 'Il Post è stato eliminato con successo',
    timeout: 10000
  }; /// </a>

  /// <b>
  const id = req.params.id;
  if (id.length < 24) {
    return next();
  } /// </b>

  /// <c>
  Post.findByIdAndRemove(id, function (err, response) {
    if (err || !response) {
      res.status(500).json({ errors: [errorMessage] });
      return next();
    }
    // res.status(200).json({ msg: 'Cancellato il Post con id: ' + id });
    successMessage.msg = `Il Post con id ${id} è stato cancellato`;
    res.status(200).json({ errors: [successMessage] });
    return next();
  }); /// </c>
};

exports.test = test;
exports.createPost = createPost;
exports.readPost = readPost;
exports.updatePost = updatePost;
exports.deletePost = deletePost;
