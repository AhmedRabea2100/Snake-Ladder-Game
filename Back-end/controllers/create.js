const game = require('../models').game;
const playergame = require('../models/').playergame;
const decrypt = require('../controllers/playerController').decryptToken;
async function createGame(req, res) {
    try {
      const numberOfPlayers = req.body.numberOfPlayers;
      const token = req.headers.authorization.slice(7);
      const playerId = decrypt(token);
      const gameData = await game.create({
        statusId : 1,
        numberOfPlayers,
        currentPlayerId: playerId,
        boardId : 1,
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
  