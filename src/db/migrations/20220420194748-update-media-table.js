'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.removeColumn('Media', 'parent_id'),
      queryInterface.addColumn('Media', 'media_set_id', {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'MediaSets',
          key: 'id',
        },
        after: 'data',
      }),
    ])
  },

  async down(queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.removeColumn('Media', 'media_set_id'),
      queryInterface.addColumn('Media', 'parent_id', {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Media',
          key: 'id',
        },
        after: 'data',
      }),
    ])
  }
};
