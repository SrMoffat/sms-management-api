
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    defaultScope: {
      attributes: {
        exclude: 'password'
      }
    }
  });
  User.associate = (models) => {
    User.hasMany(models.Sms, {
      as: 'inbox',
      foreignKey: 'recipientId'
    });

    User.hasMany(models.Sms, {
      as: 'outbox',
      foreignKey: 'senderId'
    });
  };
  return User;
};
