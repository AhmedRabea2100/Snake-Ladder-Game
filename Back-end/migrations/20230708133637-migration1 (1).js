'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('status', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      value: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Create Board table
    await queryInterface.createTable('board', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Create Game table
    await queryInterface.createTable('game', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      statusId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'status',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      numberOfPlayers: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      currentPlayerId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      boardId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'board',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      lastMoveTime:{
        type: Sequelize.TIME,
        allowNull: true
      }
    });

    await queryInterface.createTable('boardelement', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      from: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      to: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      boardId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'board',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
    
    // Create Player table
    await queryInterface.createTable('player', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
    
    // Create PlayerGame table
    await queryInterface.createTable('playergame', {
      playerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'player',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      gameId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'game',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      position: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
    

  },


  down: async (queryInterface, Sequelize) => {
   
    await queryInterface.dropTable('playergame');

    // Drop BoardElement table
    await queryInterface.dropTable('boardelement');
  
    // Drop Game table
    await queryInterface.dropTable('game');
  
    // Drop Board table
    await queryInterface.dropTable('board');
  
    // Drop Status table
    await queryInterface.dropTable('status');
  
    // Drop Player table
    await queryInterface.dropTable('player');
  

  }
};