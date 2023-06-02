const path = require('path');
const handlebars = require('handlebars');
const fs = require('fs');

const nodemailer = require('nodemailer');
const config = require('../config/config');
const logger = require('../config/logger');

const transport = nodemailer.createTransport(config.email.smtp);
/* istanbul ignore next */
if (config.env !== 'test') {
  transport
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch(() => logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env'));
}

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (to, subject, text, html = null) => {
  const msg = { from: config.email.from, to, subject, text, html };
  await transport.sendMail(msg);
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (to, token) => {
  const subject = 'Reset password';
  // replace this url with the link to the reset password page of your front-end app
  const resetPasswordUrl = `https://daveonline.us/auth/login=${token}`;
  const text = `Dear user,
To reset your password, click on this link: ${resetPasswordUrl}
If you did not request any password resets, then ignore this email.`;
  await sendEmail(to, subject, text);
};

/**
 * Send verification email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendVerificationEmail = async (to, token, name) => {
  const subject = 'Email Verification';
  // replace this url with the link to the email verification page of your front-end app
  const verificationEmailUrl = `https://daveonline.us/auth/login?token=${token}`;
  const text = `Dear user,
To verify your email, click on this link: ${verificationEmailUrl}
If you did not create an account, then ignore this email.`;

  const __dirname = path.resolve();
  const filePath = path.join(__dirname, '/src/emails/verification.html');
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  const source = fs.readFileSync(filePath, 'utf-8').toString();
  const template = handlebars.compile(source);
  const replacement = {
    name,
    verificationEmailUrl,
  };
  const htmlToSend = template(replacement);

  await sendEmail(to, subject, text, htmlToSend);
};

const sendNotificationEmail = async (email, message) => {
  const subject = 'Notification';
  const text = `Dear user,
  You have a new notification`;

  const __dirname = path.resolve();
  const filePath = path.join(__dirname, '/src/emails/notification.html');
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  const source = fs.readFileSync(filePath, 'utf-8').toString();
  const template = handlebars.compile(source);
  const replacement = {
    message,
  };
  const htmlToSend = template(replacement);

  await sendEmail(email, subject, text, htmlToSend);
};
const sendLoanEmail = async (email, message) => {
  const subject = 'Notification';
  const text = `Dear user,
  You have a new notification`;

  const __dirname = path.resolve();
  const filePath = path.join(__dirname, '/src/emails/loan.html');
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  const source = fs.readFileSync(filePath, 'utf-8').toString();
  const template = handlebars.compile(source);
  const replacement = {
    message,
  };
  const htmlToSend = template(replacement);

  await sendEmail(email, subject, text, htmlToSend);
};

module.exports = {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
  sendNotificationEmail,
  sendLoanEmail,
};
