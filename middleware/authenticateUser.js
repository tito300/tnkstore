
const jwtoken = require('jsonwebtoken');
const config = require('config');
const userservices = require('../users/services/index.js');

const userServices = userservices.userService;

module.exports = (fetch = true) => async (req, res, next) => {
  const { pJwt, jwt } = req.cookies;
  const verified = jwtoken.verify(pJwt, config.get('secret'));

  if (verified) {
    /* 
    * if fetch is set to false then user will be extracted from public jwt
    * to avoid db calls.
    */
    if (fetch) {
      const user = await userServices.getUser(verified.id);
      req.user = user;
      next();
    } else {
      const user = jwtoken.verify(jwt, config.get('secret'));
      req.user = user;
      next();
    }
  } else {
    console.error(verified);
    res.send(404, 'token is not valid');
  }
};
