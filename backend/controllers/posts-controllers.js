const faker = require('faker');
const Post = require('../models/Post');
const User = require('../models/User');
// const utils = require('../utils/functions');
const mongoose = require('mongoose');

/**
 * @route   [1] GET /api/posts/test
 * @desc    TEST
 * @webpage /
 * @action  test
 * @access  Public
 * @returns {String}
 */
const test = async (req, res, next) => {
  req.userAction = 'Test Posts';
  res.status(201).send('TEST POSTS');
  return next();
};

// const createPosts = async (req, res, next) => {
//   req.userAction = 'Create Posts';
//   res.status(201).send('Create Posts');
//   return next();
// };

/**
 * @route   POST api/posts
 * @desc    crea posts finti
 * @webpage /posts
 * @action  createPosts
 * @access  Private
 * @returns {String} stringa json.
 */
const createPosts = async (req, res, next) => {
  req.userAction = 'Create Fake Posts';
  /// <a>
  const errorMessage = {
    type: 'error',
    title: 'Errore Server',
    msg: 'Si è verificato un errore, riprovare piu tardi.',
    timeout: 10000
  };

  const warnMessage = {
    type: 'warning',
    title: 'Errore Creazione dei Post',
    msg: 'Creazione dei Post non riuscita, riprovare più tardi.',
    timeout: 10000
  };

  const successMessage = {
    type: 'success',
    title: 'Post Creati',
    msg: 'I Post sono stati creati con successo',
    timeout: 10000
  }; /// </a>

  const number = req.body.number;

  if (!number) {
    res.status(500).json({ errors: [errorMessage] });
    return next();
  }

  const userIdStr = '5e88bfffa47dd83748bc5359';
  const userId = mongoose.Types.ObjectId(userIdStr);
  let arr = [];
  for (let i = 0; i < number; i++) {
    const tags = [];
    const min = 1;
    const max = 5;
    const num = Math.floor(Math.random() * (max - min)) + min;
    for (let t = 0; t < num; t++) {
      tags.push(faker.lorem.word());
    }
    const obj = {
      user: userId,
      title: faker.lorem.words(),
      text: faker.lorem.text(),
      tags: tags,
      date: faker.date.between(faker.date.past(), faker.date.recent()),
      isFake: true
    };
    arr.push(obj);
  }

  const idList = [];
  for (let i = 0; i < arr.length; i++) {
    let post;
    post = await Post.create(arr[i]);
    if (post) {
      console.log('POST ID', post._id);
      idList.push(post._id);
    }
  }

  /// <a>
  let user;
  try {
    user = await User.findByIdAndUpdate(userIdStr, {
      $addToSet: { posts: { $each: idList } }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [errorMessage] });
    return next();
  }

  if (!user) {
    res.status(500).json({ errors: [errorMessage] });
    return next();
  } /// </a>

  res.status(200).json(arr);
  return next();
};

/**
 * @route   GET api/posts
 * @desc    Ottiene tutti i post
 * @webpage /posts
 * @action  getPosts
 * @access  Private
 * @return  Posts
 */
const getPosts = async (req, res, next) => {
  req.userAction = 'Get Posts';
  /// <m>
  const errorMessage = {
    type: 'error',
    title: 'Errore Server',
    msg: 'Si è verificato un errore, riprovare piu tardi.',
    timeout: 10000
  }; /// </m>

  try {
    const posts = await Post.find().populate('user', 'name').lean();
    // const posts = await Post.find().lean();
    // console.log('Get all Posts');
    res.status(200).json(posts);
    return next();
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ errors: [errorMessage] });
    return next();
  }
};

/**
 * @route   DELETE /api/posts
 * @desc    Cancella tutti i post
 * @webpage /posts
 * @action  deletePosts
 * @access Private
 * @returns {Json} messaggio di successo
 * <m> Object di messaggi che vengono inviati al client per mostrare gli Alert.
 */
const deletePosts = async (req, res, next) => {
  req.userAction = 'Delete Posts';

  /// <a> MESSAGES
  const errorMessage = {
    type: 'error',
    title: 'Errore Post',
    msg: 'Impossibile cancellare i Post, riprovare piu tardi',
    timeout: 10000
  };

  const warnMessage = {
    type: 'warning',
    title: 'Errore Cancellazione dei Post',
    msg: 'Non è stato cancellato nessun Post',
    timeout: 10000
  };

  const successMessage = {
    type: 'success',
    title: 'Post Cancellati',
    msg: 'I Post sono stati cancellati con successo',
    timeout: 10000
  }; /// </a>

  /// <b>
  let deletedPost;
  try {
    deletedPost = await Post.deleteMany({});
    // res.status(200).json({
    //   msg: 'Sono stati cancellati tutti i ' + post.deletedCount + ' Post.'
    // });
    // return next();
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ errors: [errorMessage] });
    return next();
  } /// </b>

  if (!deletedPost) {
    res.status(500).json({ errors: [errorMessage] });
    return next();
  }

  if (!deletedPost.ok) {
    res.status(500).json({ errors: [errorMessage] });
    return next();
  }

  if (deletedPost.deletedCount === 0) {
    res.status(500).json({ errors: [warnMessage] });
    return next();
  }

  console.log('REQ.USER.ID', req.user.id);
  /// <a>
  let user;
  try {
    user = await User.findByIdAndUpdate(req.user.id, { posts: [] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [errorMessage] });
    return next();
  }

  if (!user) {
    res.status(500).json({ errors: [errorMessage] });
    return next();
  } /// </a>

  res.status(200).json({ errors: [successMessage] });
  return next();
};

/**
 * @route   DELETE /api/posts/fake
 * @desc    Cancella tutti i post finti
 * @webpage /posts
 * @action  deleteFakePosts
 * @access Private
 * @returns {Json} messaggio di successo
 * <m> Object di messaggi che vengono inviati al client per mostrare gli Alert.
 */
/* const deleteFakePosts = async (req, res, next) => {
  req.userAction = 'Delete Fake Posts';
  const type = +req.body.type;
  console.log('TYPE', typeof type);
  const query = !type ? {} : type === 1 ? { isFake: false } : { isFake: true };

  /// <m>
  const errorMessage = {
    type: 'error',
    title: 'Errore Post',
    msg: 'Impossibile cancellare i Post, riprovare piu tardi',
    timeout: 10000
  }; /// </m>

  /// <a>
  try {
    const post = await Post.deleteMany(query);
    res.status(200).json({
      msg: 'Sono stati cancellati tutti i ' + post.deletedCount + ' finti Post.'
    });
    return next();
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ errors: [errorMessage] });
    return next();
  } /// </a>
  // next();
}; */

exports.test = test;
exports.createPosts = createPosts;
exports.getPosts = getPosts;
exports.deletePosts = deletePosts;
// exports.deleteFakePosts = deleteFakePosts;
