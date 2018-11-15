const express = require('express');

const router = express.Router();
const passport = require('passport');

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/aoth/login/failed',
}), (req, res) => {
  res.render('partials/login', { 'user': req.user });
});

router.get('/login', (req, res) => {
  res.render('partials/login', { 'user': req.user });
});

router.get('/login/failed', (req, res) => {
  res.render('partials/loginFailed'); /* to be built */
});

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/redirect', passport.authenticate('google'), (req, res, next) => { res.redirect('/'); });


router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});


module.exports = router;
