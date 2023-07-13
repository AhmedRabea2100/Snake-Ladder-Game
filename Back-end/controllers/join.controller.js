const game = require('../models').game
const playergame = require('../models').playergame
const decrypt = require('../controllers/playerController').decryptToken;
const player = require('../models').player;
const board = require('../models').board;
function exporter2(numberOfPlayers,bgpic,gamestatus,username){
    const data = {
        "numberOfPlayers": numberOfPlayers,
        "bgpic": bgpic,
        "gamestatus": gamestatus,
        "username": username.username
    }
    return data

}

const JoinController = async (req, res) => {
    try {
        const gameId  = req.body.roomId
        console.log(gameId)
        const token = req.body.authorization;
        const playerId = decrypt(token);
        const current_game = game.findOne({id: gameId})
        const username = await player.findOne({id: playerId})
        if (!current_game) {
            res.send("game not found") 
        } 
        else if (current_game.statusId == 3) {
            res.send("game is completed")
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
                //res.send({"status":"2" , "data":"here"})
                //res.send("here")
                
            const boardID =await current_game.boardId;
            const image= await board.findByPk(boardID);
                res.json({"status":"2" , "data":exporter2(count,image,run,username)});
            }
            const pend=1;

            const boardID =await current_game.boardId;
            const image= await board.findByPk(boardID);
            res.json({"status":"2" , "data":exporter2(count,image,pend,username)});
           // res.send({"status":"2" , "data":"here2"})
           // res.send("here2")
        }
        else {
            res.json({"status":"1" , "message":"you are already in the game"}) 
        }


    } catch (error) {
        console.log(error)
        //res.send({"status":"1" ,"DATA": exporter2(numberOfPlayers,image,pend,username)})
        res.json({"message":"error"})
          
    }
}



module.exports = {
    JoinController
}