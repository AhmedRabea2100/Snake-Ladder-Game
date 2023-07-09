'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('playergame', 'position', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1// New default value for the column
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('playergame', 'position', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0// New default value for the column
    });
  }
};
