const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
  let pathname = path.join(__dirname, '../client/build/index.html');
  res.sendFile(pathname);
});

module.exports = router;
