const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info.message });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('jwt', token, { httpOnly: true });
    return res.json({ message: 'Login exitoso', user });
  })(req, res, next);
});

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;