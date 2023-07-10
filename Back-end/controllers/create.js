const game = require('../models').game;
const playergame = require('../models').playergame;

async function createGame(req, res) {
    try {
      const { statusId, numberOfPlayers, boardId, lastMoveTime,  playerId} = req.body;
  
      const gameData = await game.create({
        statusId,
        numberOfPlayers,
        currentPlayerId: playerId,
        boardId,
        lastMoveTime
      });
      
      const createdGameId = gameData.id

      const playerGameData = await playergame.create({
        playerId,
        gameId: createdGameId,
        position: 1
      });

      res.json({ id:  createdGameId});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  module.exports = {
    createGame,
  };
  