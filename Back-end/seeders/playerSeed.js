const bcrypt = require('bcrypt');
const player = require('../models').player; // Assuming your model file is in the models directory

module.exports = {
    up: async (queryInterface, Sequelize) => {
      // Generate a hashed password
      const hashedPassword = await bcrypt.hash('23456', 10);
  
      // Generate sample player data
      const players = [
        {
          username: 'player1',
          password: hashedPassword,
        },
        {
          username: 'player2',
          password: hashedPassword,
        },
        // Add more player objects as needed
      ];
  
      // Insert players into the 'player' table using the Player model
      await player.bulkCreate(players);
    },
  
    down: async (queryInterface, Sequelize) => {
      // Remove all players from the 'player' table
      await player.destroy({ truncate: true });
    },
  };
  