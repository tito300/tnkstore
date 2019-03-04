const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const config = require('config');

const { logger } = require('../logger/logger');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER || config.get('gmail_user'),
    pass: process.env.GMAIL_PASS || config.get('gmail_pass')
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false
  }
})

const router = express.Router();

router.get('/', (req, res) => {
  let pathname = path.join(__dirname, '../client/build/index.html');
  res.sendFile(pathname);
});

router.post('/contactus', (req, res) => {
  const {email, message} = req.body;
  
  transporter.sendMail({
    to: 'tarek.demachkie@gmail.com',
    from: email,
    subject: `Contact us filled by ${email}`,
    html: `From: ${email}<br/><p>${message}</p>`
  }, (err, info) => {
    if(err) {
      logger.error(`nodemailer Error: ${JSON.stringify(err)}`);
      res.status(500).end();
    } else {
      res.status(200).end();
    }
  })
})

module.exports = router;
