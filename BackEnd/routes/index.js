const express = require('express');

const router = express.Router();

// GET home page.
router.get('/', (req, res, next) => {
  res.render('index', { title: 'AAI-a5' });
});

router.get('/login', (req, res, next) => {
  res.render('signin', { title: 'Sign-In AAI' });
});

router.get('/register', (req, res, next) => {
  res.render('register', { title: 'Register AAI' });
});  

module.exports = router;
