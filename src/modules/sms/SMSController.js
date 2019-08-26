import smsStatus from '../../utils/sms';
import models from '../../database/models';

class SMSController {
  static async send(req, res) {
    const { user, body: { message, recipient } } = req;

    const recipientUser = await models.User.findOne({ where: { phoneNumber: recipient } });
    // create the sms
    const sms = await models.Sms.create({
      message,
      recipientId: recipientUser.id,
      senderId: user.id,
      status: smsStatus.SENT
    });

    return res.status(201).json({
      success: true,
      sms
    });
  }

  static async inbox(req, res) {
    const { user } = req;
    const inbox = await models.Sms.findAll({ where: { recipientId: user.id } });

    await models.Sms.update({
      status: smsStatus.READ
    },
    {
      where: {
        recipientId: user.id, status: smsStatus.PENDING
      }
    });

    return res.status(200).json({
      success: true,
      inbox
    });
  }

  static async outbox(req, res) {
    const { user } = req;
    const outbox = await models.Sms.findAll({ where: { senderId: user.id } });

    return res.status(200).json({
      success: true,
      outbox
    });
  }

  static async markAsRead(req, res) {
    const { params: { id }, user } = req;
    const sms = await models.Sms.findOne({ where: { id, recipientId: user.id } });
    if (sms) {
      await sms.update({
        status: smsStatus.READ
      });
      return res.status(200).json({
        success: true,
        message: 'SMS has been marked as read'
      });
    }
    return res.status(404).json({
      message: 'SMS does not exist',
      success: false
    });
  }
}

export default SMSController;
