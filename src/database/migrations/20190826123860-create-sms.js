const sms = require('../../utils/sms');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Sms', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    recipientId: {
      type: Sequelize.INTEGER,
      onDelete: 'cascade',
      references: {
        model: 'Users',
        as: 'recipient',
        key: 'id'
      }
    },
    senderId: {
      type: Sequelize.INTEGER,
      onDelete: 'cascade',
      references: {
        model: 'Users',
        as: 'sender',
        key: 'id'
      }
    },
    message: {
      type: Sequelize.TEXT,
      defaultValue: ''
    },
    status: {
      type: Sequelize.ENUM(Object.values(sms)),
      defaultValue: sms.PENDING
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Sms')
};
