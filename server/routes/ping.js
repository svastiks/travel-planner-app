const router = require('express').Router();

router.get('/', (req, res) => {
  console.log('Ping endpoint was hit!')
  res.status(200).json({ status: 'ok' });
});

module.exports = router; 