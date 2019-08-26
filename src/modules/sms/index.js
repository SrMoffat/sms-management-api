import express from 'express';
import BaseValidator from '../../middleware/BaseValidator';
import SMSController from './SMSController';

const Router = express.Router();
const { authenticate, validateSMS } = BaseValidator;

Router.post('/send',
  authenticate,
  validateSMS,
  SMSController.send);

Router.get('/inbox',
  authenticate,
  SMSController.inbox);

Router.get('/outbox',
  authenticate,
  SMSController.outbox);

Router.post('/read/:id',
  authenticate,
  SMSController.markAsRead);

export default Router;
