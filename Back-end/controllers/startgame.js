const Game = require('../models').game;
const playergame = require('../models').playergame;
function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

const startgame = async (req, res) => {
  
  try {
    const gameId = req.params.gameId;
    const game = await Game.findByPk(gameId);
    const numOfPlayers = game.numberOfPlayers;
    console.log(numOfPlayers);
    const players = await playergame.findAll({where: {gameId: gameId}});
    const playerTurns = {};
    var i = 0;
    for (const x of players) {
      playerTurns[i] = x.playerId;
      i++;
    } 
    var Currentturn = playerTurns[0];
    
    
    const run=2;
    const nextPlayerId =playerTurns[Currentturn];
    console.log(Currentturn)
    await game.update({ ['currentPlayerId']: Currentturn });
    await game.update({ ['statusId']: run});
    console.log("game running");
    

    

    res.json(gameId);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

module.exports = startgame;
