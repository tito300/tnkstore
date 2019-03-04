const express = require('express');

const router = express.Router();
const passport = require('passport');

// router.get('/login', (req, res) => {
//   res.render('partials/login', { 'user': req.user });
// });

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/redirect', passport.authenticate('google', { session: false }), (req, res, next) => {
  // public
  res.cookie('jwt', req.user.jwt);

  // private
  res.cookie('pJwt', req.user.pJwt);

  let url = process.env.NODE_ENV === 'production' ? 'https://tnk-store.herokuapp.com' : 'http://localhost:3000/';
  res.redirect('http://localhost:3000/');
});


router.get('/logout', (req, res) => {
  res.clearCookie('jwt');
  res.clearCookie('pJwt');
  res.redirect('/');
});


module.exports = router;
