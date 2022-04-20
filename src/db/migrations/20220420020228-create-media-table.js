'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Media', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      data: {
        allowNull: false,
        type: Sequelize.JSON,
      },
      parent_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Media',
          key: 'id',
        },
      },
      format_type_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'FormatTypes',
          key: 'id',
        },
      },
      status_type_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'StatusTypes',
          key: 'id',
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });

  },
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Media'),
};
