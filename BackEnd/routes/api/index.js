const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.json({ text: " Insider API Test "});
});

const testJSON = [
  {
    name: 'Santi',
    username: 'ZeroPlus',
  },
  {
    name: 'Piyawat',
    username: 'Dean123',
  },
];

router.get('/sendjson', (req, res, next) => {
  res.json(testJSON);
});

module.exports = router;
