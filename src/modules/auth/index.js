import express from 'express';
import BaseValidator from '../../middleware/BaseValidator';
import UserController from './UserController';


const Router = express.Router();

Router.post('/register',
  BaseValidator.checkAuth,
  BaseValidator.checkUniquePhone,
  UserController.register);


Router.post('/login',
  BaseValidator.checkAuth,
  UserController.login);


export default Router;
