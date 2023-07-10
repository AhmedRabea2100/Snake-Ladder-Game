const game = require('../models').game;
const playergame = require('../models').playergame;
function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}
function rollDice(min = 1, max = 7) {
    let difference = max - min;
    let rand = Math.random();
    rand = Math.floor(rand * difference);
    rand = rand + min;
    return rand;
}
const move = async (req, res) => {
    try {
        const gameId  = req.params.gameId
        const playerId = req.params.playerId
        const current_game = await game.findByPk(gameId)
        const player_game = await playergame.findOne({
                where: {
                    playerId: playerId,
                    gameId: gameId
                }});
        
        last_position = player_game.position
        new_position = last_position + rollDice()
        console.log(new_position)
        if (new_position < 100) { await
                player_game.update({ position: new_position })
                console.log("updated")
         } 
         else if (new_position = 100) { await
                current_game.update({statusId: 3})
                console.log("finished")
        }
    const numOfPlayers = current_game.numberOfPlayers;
    console.log(numOfPlayers);
    const players = await playergame.findAll({where: {gameId: gameId}});
    const playerTurns = {};
    var i = 0;
    for (const x of players) {
      playerTurns[i] = x.playerId;
      i++;
    } 
    console.log(playerTurns);
    var Currentturn = getKeyByValue(playerTurns,current_game.currentPlayerId)
    console.log(current_game.currentPlayerId);
    
    if (Currentturn<numOfPlayers-1){
        console.log('here');
        Currentturn++;
     }
     else {Currentturn=0;}
     console.log(Currentturn);
    const nextPlayerId =playerTurns[Currentturn];
    await current_game.update({ currentPlayerId: nextPlayerId })

     
        res.status(200);
        res.json({last: last_position,new: new_position,moves:(new_position-last_position)});
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500);
        
    }

}

module.exports = move;