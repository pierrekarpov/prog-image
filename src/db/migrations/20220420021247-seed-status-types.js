'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'StatusTypes',
      [
        {
          id: 1,
          name: 'Pending',
          created_at: Sequelize.fn('NOW'),
          updated_at: Sequelize.fn('NOW'),
        },
        {
          id: 2,
          name: 'Progress',
          created_at: Sequelize.fn('NOW'),
          updated_at: Sequelize.fn('NOW'),
        },
        {
          id: 3,
          name: 'Failure',
          created_at: Sequelize.fn('NOW'),
          updated_at: Sequelize.fn('NOW'),
        },
        {
          id: 4,
          name: 'Success',
          created_at: Sequelize.fn('NOW'),
          updated_at: Sequelize.fn('NOW'),
        },
      ],
      {}
    ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('StatusTypes', null, {}),
};
