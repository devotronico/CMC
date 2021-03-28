/// ! MIDDLEWARE NON UTILIZZATO
module.exports = function(req, res, next) {
  // console.log('USER ID: ', req.user.id);
  // console.log('METHOD: ', req.method);
  // console.log('ROUTE: ', `/api/auth${req.route.path}`);
  // console.log('IP: ', req.clientIp);

  // req.log = {
  //   user_id: req.clientIp,
  //   method: req.method,
  //   code: 0,
  //   route: `/api/auth${req.route.path}`,
  //   action: 'Register',
  //   ip: req.clientIp
  // };

  next();

  // try {
  //   req.clientIp = requestIp.getClientIp(req);

  // } catch (err) {
  //   return res.status(401).json({ msg: 'Errore request-ip' });
  // }
};

// const log = new Log({
//   user_id: existingUser._id,
//   method: req.method,
//   code: 200,
//   route: '/api/auth/login',
//   action: 'Register',
//   ip: req.clientIp
// });
