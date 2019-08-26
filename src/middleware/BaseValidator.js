import ErrorHandler from '../utils/ErrorHandler';
import models from '../database/models';
import JWT from '../utils/JWT';

const validator = {

  checkAuth: (req) => {
    req.checkBody('phoneNumber', 'Please provide a phone number')
      .notEmpty()
      .matches(/(\+254|254|07)\d{8}/);
    req.checkBody('password', 'Password must be provided').notEmpty();
  },

  checkUser: async (req, res) => {
    const { phoneNumber } = req.body || req.user;
    if (!(await models.User.findOne({ where: { phoneNumber } }))) {
      return res.status(404).json({
        success: false,
        message: 'User does not exist'
      });
    }
  },

  authenticate: async (req, res) => {
    const { authorization: auth } = req.headers;

    const token = auth ? auth.split(' ') : [];
    if (token.length !== 2 || token[0].toLowerCase() !== 'bearer') {
      return res.status(401).json({
        success: false,
        message: 'Authorization token not provided'
      });
    }

    try {
      const authToken = token[1];
      const decoded = await JWT.verify(authToken);
      req.userToken = authToken;

      req.user = await models.User.findByPk(decoded.id);
      if (!req.user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }
    } catch (e) {
      return res.status(401).json({
        success: false,
        message: 'Invalid authorization token'
      });
    }
  },

  checkUniquePhone: async (req) => {
    const { body: { phoneNumber } } = req;
    const user = await models.User.findOne({ where: { phoneNumber } });
    req.checkBody('phoneNumber', 'Phone number is already in use')
      .custom(() => user === null);
  },

  validateSMS: async (req) => {
    const { user } = req;
    const recipientUser = await models.User.findOne({ where: { phoneNumber: req.body.recipient } });
    req.checkBody('message', 'Message is required').notEmpty();
    req.checkBody('recipient', 'Recipient phone number is required')
      .notEmpty()
      .custom(phoneNumber => user.phoneNumber !== phoneNumber)
      .withMessage('The recipient cannot be the same as the sender')
      .custom(() => recipientUser !== null)
      .withMessage('Recipient does not exist in the system');
  }
};

const BaseValidator = Object.keys(validator).reduce((acc, cur) => ({
  ...acc,
  [cur]: async (req, res, next) => {
    await validator[cur](req, res);
    if (!res.headersSent) {
      return ErrorHandler.handle(req, res, next);
    }
  }
}), {});

export default BaseValidator;
