import bcrypt from 'bcrypt';
import models from '../../database/models';
import JWT from '../../utils/JWT';
import * as smsStatus from '../../utils/sms';

const SALT = 10;

class UserController {
  static async login(req, res) {
    const { body: { phoneNumber, password } } = req;
    const user = await models.User.unscoped().findOne({ where: { phoneNumber } });

    if (user && await bcrypt.compare(password, user.password)) {
      delete user.dataValues.password;
      await models.Sms.update({
        status: smsStatus.DELIVERED
      },
      {
        where: {
          recipientId: user.id, status: smsStatus.PENDING
        }
      });

      return res.status(200).json({
        success: true,
        token: JWT.generate(user),
        user
      });
    }
    return res.status(403).json({
      success: false,
      message: 'Invalid login credentials'
    });
  }

  static async register(req, res) {
    const { body: { phoneNumber, password, name } } = req;
    const user = await models.User.create({
      phoneNumber,
      password: await bcrypt.hash(password, SALT),
      name
    });

    await user.reload();

    return res.status(200).json({
      success: true,
      token: JWT.generate(user),
      user
    });
  }
}


export default UserController;
