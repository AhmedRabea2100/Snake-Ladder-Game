'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.removeConstraint('playergame', 'playergame_ibfk_1');
    await queryInterface.changeColumn('player', 'id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true

    });
    await queryInterface.addConstraint('playergame', {
      fields: ['playerID',],
      type: 'foreign key',
      name: 'playergame_ibfk_1',
      references: {
        table: 'player',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    await queryInterface.changeColumn('player', 'username', {
      type: Sequelize.STRING(255),
      allowNull: false,
      unique: true
    });


    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('player', 'username', {
      type: Sequelize.STRING(255),
      allowNull: false,
      unique: false
    });
   await queryInterface.removeConstraint('playergame', 'playergame_ibfk_1');
    await queryInterface.changeColumn('player', 'id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    });

    await queryInterface.addConstraint('playergame', {
      fields: ['playerID',],
      type: 'foreign key',
      name: 'playergame_ibfk_1',
      references: {
        table: 'player',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    
    
    
    
  }
};
