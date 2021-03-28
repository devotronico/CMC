const requestIp = require('request-ip');

/// ! MIDDLEWARE NON UTILIZZATO
module.exports = function(req, res, next) {
  try {
    req.clientIp = requestIp.getClientIp(req);
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Errore request-ip' });
  }
};

// on localhost you'll see 127.0.0.1 if you're using IPv4
// or ::1, ::ffff:127.0.0.1 if you're using IPv6
