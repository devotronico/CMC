const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Connect Database
connectDB();

// Middleware Body parser
// @see: https://expressjs.com/en/api.html#express.json
app.use(express.json({ extended: false }));

/// Middleware Cors
app.use(cors());

app.use(function (req, res, next) {
  req.timeStart = Date.now();
  next();
});

/// Riga da disattivare al momento del deploy
// app.get('/', (req, res) => res.send('API Running'));

/**
 * Define Routes
 * parametro 1:api url. es: http://localhost:5000/api/users
 * parametro 2:percorso file del codice che gestisce la logica
 */
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const usersRoutes = require('./routes/users');
const notifyRoutes = require('./routes/notify');
const logRoutes = require('./routes/log');
const postRoutes = require('./routes/post');
const postsRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comment');
const commentsRoutes = require('./routes/comments');
const profileRoutes = require('./routes/profile');
const profilesRoutes = require('./routes/profiles');

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/notify', notifyRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/post', postRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/profiles', profilesRoutes);

app.all('*', (req, res, next) => {
  req.timeDiff = Date.now() - req.timeStart;
  console.log('==============================');
  console.log('TIME ELAPSED: ', req.timeDiff);
  next();
});

/**
 * Salva un Log nel database
 */
app.all(/^\/api\/(?!log)[a-z]+[a-z0-9\/]*$/, (req, res, next) => {
  const requestIp = require('request-ip');
  const userIP = requestIp.getClientIp(req);

  const Log = require('./models/Log');
  // const timeFinish = Date.now();
  // const timeDiff = timeFinish - req.timeStart;

  /// <g> Salva il nuovo Log nel database
  const id = req.user ? req.user.id : req.userid;

  const log = new Log({
    method: req.method,
    code: req.res.statusCode,
    route: req.path,
    action: req.userAction,
    ip: userIP,
    time: req.timeDiff
  });

  id ? (log.user_id = id) : null;

  try {
    log.save();
  } catch (err) {
    console.log('ERRORE LOG');
  }
  /// </g>

  console.log('USER_ACTION: ', req.userAction);
  console.log('==============================');
  next();
});

app.use(function (req, res, next) {
  console.log('==============================');
  console.log('LAST MIDDLEWARE');
  console.log('==============================');
  console.log('==============================');
  console.log('==============================');
});

/**
 * Serve static assets in production
 * [a] Set static folder
 * [b] meglio `path.resolve` oppure `path.join`
 */
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build')); // [a]

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  }); // [b]
}

/**
 * in locale utilizza la porta 5000
 * process.env.PORT: in produzione su heroku la porta disponibile su heroku
 */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `Server started on port ${PORT} at ${new Date().toLocaleTimeString()}`
  )
);
