
module.exports = (sequelize, DataTypes) => {
  const Sms = sequelize.define('Sms', {
    message: DataTypes.TEXT,
    status: DataTypes.STRING
  }, {});
  Sms.associate = (models) => {
    Sms.belongsTo(models.User, {
      as: 'sender',
      foreignKey: 'senderId'
    });

    Sms.belongsTo(models.User, {
      as: 'recipient',
      foreignKey: 'recipientId'
    });
  };
  return Sms;
};
