const game = require('../models').game
const playergame = require('../models').playergame
const decrypt = require('../controllers/playerController').decryptToken;

const JoinController = async (req, res) => {
    try {
        const gameId  = req.params.game_id
        const token = req.headers.authorization.slice(7);
        const playerId = decrypt(token);
        const current_game = game.findOne({id: gameId})
        if (!current_game) {
            res.status(404).json({status: "failed", message: "game not found"})
        } 
        else if (current_game.statusId == 3) {
            res.status(404).json({status: "failed", message: "game is completed"})
        } 
        const [player_game, created] = await playergame.findOrCreate({
            where: {
                playerId: playerId,
                gameId: gameId
            }
        })
        if (created) {
            const { count, rows } = await playergame.findAndCountAll({
                where: {
                    gameId: gameId
                }
            })
            let limit_num = await game.findByPk(gameId)
            limit_num = limit_num.numberOfPlayers
            console.log(limit_num)
            if (count == limit_num) {
                // start game
                const players = await playergame.findAll({where: {gameId: gameId}});
                const playerTurns = {};
                var i = 0;
                for (const x of players) {
                    playerTurns[i] = x.playerId;
                    i++;
                } 
                var Currentturn = playerTurns[0];
                const run=2;
                console.log(Currentturn)
                await game.update({ currentPlayerId: Currentturn }, {
                    where: {
                        id: gameId
                    }
                });
                await game.update({ statusId: run}, {
                    where: {
                        id: gameId
                    }
                });
                console.log("game running");
                
            }
            res.status(200).json({status: "success", message: "joined the game successfully"})
        }
        else {
            res.status(403).json({status: "failed", message: "you are already in the game"})
        }


    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
}



module.exports = {
    JoinController
}