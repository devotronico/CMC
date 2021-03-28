const Post = require('../models/Post');
const User = require('../models/User');
const utils = require('../utils/functions');

/**
 * @route   [1] GET /api/comment/test
 * @desc    TEST
 * @webpage /
 * @action  test
 * @access  Public
 * @returns {String}
 */
const test = async (req, res, next) => {
  req.userAction = 'Test Comment';
  res.status(201).send('TEST COMMENT');
  return next();
};

/**
 * @route   POST api/comment
 * @desc    l'admin crea un nuovo a utente con: name, email, password
 * @webpage /comment/create
 * @action  createComment
 * @access  private
 * @returns {String} stringa json con i valori: id,title,text,tags.
 *   req: invia al server i parametri del body(name, email, password).
 *   res: ritorna la risposta dal server.
 * Vengono eseguiti i seguenti controlli sui valori inseriti dall'utente:
 * [a] `validationResult` check la validità dei valori(title,text).
 * [b] Se il titolo è già presente nel database ritorna un errore.
 * [d] Crea un documento Comment con i valori:title,text,tags.
 * [f] Col metodo `save` viene salvato il nuovo articolo nel db assegnandogli un id.
 */
const createComment = async (req, res, next) => {
  req.userAction = 'Create Comment';
  /// <a>
  const errorMessage = {
    type: 'error',
    title: 'Errore Creazione Comment',
    msg: 'Creazione Comment non riuscita, riprovare più tardi.',
    timeout: 10000
  };

  const warnMessage = {
    type: 'warning',
    title: 'Errore Creazione Comment',
    msg: 'Creazione Comment non riuscita, riprovare più tardi.',
    timeout: 10000
  }; /// </a>

  /// <b>
  const errors = utils.useExpressValidator(req, warnMessage);
  if (errors) {
    res.status(422).json({ errors });
    return next();
  }
  /// </b>

  const { text, post_id } = req.body;
  const user_id = req.user.id;

  const comment = {
    user: user_id,
    text
  };

  /// <c>
  let post;
  try {
    post = await Post.findByIdAndUpdate(
      post_id,
      { $addToSet: { comments: comment } },
      { new: true }
    );
  } catch (error) {
    res.status(500).json({ errors: [errorMessage] });
    return next();
  }

  if (!post) {
    res.status(500).json({ errors: [errorMessage] });
    return next();
  }
  /// </c>

  /// <d>
  let commentPopulated;
  const commentNumber = post.comments.length - 1;
  try {
    commentPopulated = await post
      .populate(`comments.${commentNumber}.user`, ['name', 'avatar'])
      .execPopulate();
  } catch (error) {
    res.status(500).json({ errors: [errorMessage] });
    return next();
  }

  if (!commentPopulated) {
    res.status(500).json({ errors: [errorMessage] });
    return next();
  }
  /// </d>

  res.status(201).json(commentPopulated.comments[commentNumber]);
  return next();
};

/**
 * @route   GET /api/comment/:id
 * @desc    Recupera un comment tramite il suo id passato come parametro dell'url
 * @webpage /comment
 * @action  readComment
 * @access  public
 * @argument {string} req.params.id - id del comment
 * @returns {Json} - documento completo
 * <a> Controlla se l'id è valido altrimenti passa al prossimo middleware.
 * <b> Object di messaggi che vengono inviati al client per mostrare gli Alert.
 * <c> Ottiene un comment tramite il suo id passato come parametro dell'url
 */
const readComment = async (req, res, next) => {
  req.userAction = 'Get Comment';

  const errorMessage = {
    type: 'error',
    title: 'Errore Comment',
    msg: 'Impossibile visualizzare il Comment.',
    timeout: 10000
  }; /// </b>

  /// <a>
  const id = req.params.id;
  if (id.length < 24) {
    console.log('OOOOOKKKKK 123');
    res.status(500).json({ errors: [errorMessage] });
    return next();
  } /// </a>

  /// <c>
  let comment;
  try {
    comment = await Comment.findById(id).populate('user', [
      'name',
      'email',
      'avatar'
    ]);
    // comment = await Comment.findById(id).lean();
  } catch (err) {
    res.status(500).json({ errors: [errorMessage] });
    return next();
  }

  if (!comment) {
    res.status(500).json({ errors: [errorMessage] });
    return next();
  } /// </c>

  res.status(201).json(comment);
  return next();
};

/**
 * @route   PUT api/comment/:id
 * @desc    update comment
 * @webpage /comment/:id
 * @action  updateComment
 * @access  Private
 * @returns {Json} comment
 * [a] Cerca il comment da aggiornare:
 *      _id: comment.id ricevuto da url.
 *      $set: se il campo worked non esiste lo crea.
 *      new: se `true`, restituisce il documento modificato anziché l'originale,
 *           il valore predefinito è false
 * [b] Nel documento users cambia aggiorna i valori ....
 * [c] salva il documento aggiornato.
 */
const updateComment = async (req, res) => {
  req.userAction = 'Update Comment';

  /// <a> MESSAGES
  const errorMessage = {
    type: 'error',
    title: 'Errore Modifica Comment',
    msg: 'Impossibile modificare il Comment. Riprovare più tardi',
    timeout: 10000
  };

  const successMessage = {
    type: 'success',
    title: 'Comment Modificato',
    msg: 'Il Comment è stato modificato con successo',
    timeout: 10000
  }; /// </a>

  try {
    const { title, text, tags } = req.body;
    const comment = await Comment.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { title: title, text: text, tags: tags } },
      { new: true }
    );
    //   return res.json(comment);

    const location = `${req.protocol}://${req.get('host')}${req.baseUrl}${
      req.path
    }/${comment._id}`;
    res.setHeader('Location', location);
    res.status(201).json(comment);
    return next();
  } catch (err) {
    // console.log(err.message);
    res.status(500).json({ errors: [errorMessage] });
    return next();
  }
};

/**
 * @route   DELETE /api/comment/:id
 * @desc    Cancella un comment tramite il suo id passato come parametro dell'url
 * @webpage /comment
 * @action  deleteComment
 * @access  Private
 * @argument {string} req.params.id - id del comment
 * @returns {Json} - messaggio di successo
 * <a> Object di messaggi che vengono inviati al client per mostrare gli Alert.
 * <b> Controlla se l'id è valido altrimenti passa al prossimo middleware.
 * <c> Ottiene e cancella un comment tramite il suo id passato come parametro dell'url.
 */
const deleteComment = async (req, res, next) => {
  req.userAction = 'Delete Comment';

  /// <a> MESSAGES
  const errorMessage = {
    type: 'error',
    title: 'Errore Comment',
    msg: 'Impossibile cancellare il Comment. Riprovare più tardi',
    timeout: 10000
  };

  const successMessage = {
    type: 'success',
    title: 'Success',
    msg: 'Il Comment è stato eliminato con successo',
    timeout: 10000
  }; /// </a>

  /// <a>
  const id = req.params.id;
  if (id.length < 24) {
    return next();
  } /// </a>

  /// <c>
  Comment.findByIdAndRemove(id, function (err, response) {
    if (err || !response) {
      res.status(500).json({ errors: [errorMessage] });
      return next();
    }
    // res.status(200).json({ msg: 'Cancellato il Comment con id: ' + id });
    successMessage.msg = `Il Comment con id "${id}" è stato cancellato`;
    res.status(200).json({ errors: [successMessage] });
    return next();
  }); /// </c>
};

exports.test = test;
exports.createComment = createComment;
exports.readComment = readComment;
exports.updateComment = updateComment;
exports.deleteComment = deleteComment;
