const game = require('../models').game;
const playergame = require('../models/').playergame;
const decrypt = require('../controllers/playerController').decryptToken;

async function createGame(req, res) {
    try {
      const numberOfPlayers = req.body.numberOfPlayers;
      const token = req.body.authorization;
      const playerId = decrypt(token);
      const gameData = await game.create({
        statusId : 1,
        numberOfPlayers,
        currentPlayerId: playerId,
        boardId : 1,
      });
      const createdGameId = gameData.id
      socket = global.connectedSockets[playerId]

      socket.join(createdGameId);
      console.log(`Socket ${socket.id} joined room ${createdGameId}`);


      const playerGameData = await playergame.create({
        playerId,
        gameId: createdGameId,
        position: 1
      });
      
      global.io.emit('roomCreated',"hello from server");

      res.json({ id:  createdGameId});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  module.exports = {
    createGame,
  };
  