'use strict';



/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('status', [{ id: 1, value: 'Pending' },
    { id: 2, value: 'Running' },
    { id: 3, value: 'Finished' },]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('status', null, {});
  }
};
