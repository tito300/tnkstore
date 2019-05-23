const express = require('express');
const createError = require('http-errors');

const router = express.Router();
const passport = require('passport');
const { userService } = require('./services/index.js');
const authenticateUser = require('../middleware/authenticateUser.js');


/* * *
 *
 * register user
 *
 * * * * */
router.post('/register', async (req, res, next) => {
  // debugger;
  const newUser = await userService.registerUser(req.body);
  if (newUser.status === 404) return res.status(404).send(newUser);

  let { jwt, pJwt } = newUser;

  res.cookie('jwt', jwt);
  res.cookie('pJwt', pJwt);

  if (newUser.jwt) res.send({ jwt: newUser.jwt });
});

/* * *
 *
 * user login
 *
 * * * * */
router.post('/login', passport.authenticate('local', {
  session: false,
}), async (req, res) => {
  if (req.user instanceof Error) {
    return res.status(400).send({ message: 'username or password is wrong' });
  }

  if (req.user) {
    const { jwt, pJwt } = req.user;
    res.cookie('jwt', jwt);
    res.cookie('pJwt', pJwt);
    res.send({ jwt });
  }
});


/* * *
 *
 * update cart items
 *
 * * * * */
router.post('/cart/updateCart', authenticateUser(), async (req, res, next) => {
  const userId = req.user.id;
  const cartItems = req.body.items;
  const login = (req.query.login === 'true');


  const done = await userService.updateCart(userId, cartItems, login);
  if (done instanceof Error) return next(createError(done));

  res.send(done);
});


/* * *
 *
 * get cart items
 *
 * * * * */
router.get('/getCartItems', authenticateUser(), async (req, res) => {
  const userId = req.user.id;

  const cartItems = await userService.getCartItems(userId);
  if (cartItems instanceof Error) return next(createError(500, 'Error at getCartItems'));

  res.send(JSON.stringify(cartItems));
});


module.exports = router;
