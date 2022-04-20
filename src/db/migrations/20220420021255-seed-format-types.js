'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'FormatTypes',
      [
        {
          id: 1,
          name: 'jpeg',
          created_at: Sequelize.fn('NOW'),
          updated_at: Sequelize.fn('NOW'),
        },
        {
          id: 2,
          name: 'png',
          created_at: Sequelize.fn('NOW'),
          updated_at: Sequelize.fn('NOW'),
        },
        {
          id: 3,
          name: 'gif',
          created_at: Sequelize.fn('NOW'),
          updated_at: Sequelize.fn('NOW'),
        },
        {
          id: 4,
          name: 'bmp',
          created_at: Sequelize.fn('NOW'),
          updated_at: Sequelize.fn('NOW'),
        },
        {
          id: 5,
          name: 'tiff',
          created_at: Sequelize.fn('NOW'),
          updated_at: Sequelize.fn('NOW'),
        },
      ],
      {}
    ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('FormatTypes', null, {}),
};
