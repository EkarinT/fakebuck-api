const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const AppError = require('../utils/appError');
const { User } = require('../models/User');

const genToken = (payload) => jwt.sign(payload,);

exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, emailOrMobile, password, confirmPassword } =
      req.body;

    if (!emailOrMobile) {
      throw new AppError('email address or mobile is required', 400);
    }

    if (!password) {
      throw new AppError('password is required', 400);
    }

    if (password !== confirmPassword) {
      throw new AppError('password and confirm password did not match', 400);
    }

    const isEmail = validator.isEmail(emailOrMobile + '');
    const isMobile = validator.isMobilePhone(emailOrMobile + '');

    if (!isEmail && !isMobile) {
      throw new AppError('e-mail address or mobile is invalid format', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      firstName,
      lastName,
      email: isEmail ? emailOrMobile : null,
      mobile: isMobile ? emailOrMobile : null,
      password: hashedPassword
    });
  } catch (err) {
    next(err);
  }
};
