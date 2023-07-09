const game = require('../models').game;

async function createGame(req, res) {
    try {
      const { statusId, numberOfPlayers, currentPlayerId, boardId, lastMoveTime } = req.body;
  
      const data = await game.create({
        statusId,
        numberOfPlayers,
        currentPlayerId,
        boardId,
        lastMoveTime,
      });
  
      res.json({ id: data.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  module.exports = {
    createGame,
  };
  