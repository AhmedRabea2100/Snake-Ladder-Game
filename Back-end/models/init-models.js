var DataTypes = require("sequelize").DataTypes;
var _board = require("./board");
var _boardelement = require("./boardelement");
var _game = require("./game");
var _player = require("./player");
var _playergame = require("./playergame");
var _sequelizemeta = require("./sequelizemeta");
var _status = require("./status");

function initModels(sequelize) {
  var board = _board(sequelize, DataTypes);
  var boardelement = _boardelement(sequelize, DataTypes);
  var game = _game(sequelize, DataTypes);
  var player = _player(sequelize, DataTypes);
  var playergame = _playergame(sequelize, DataTypes);
  var sequelizemeta = _sequelizemeta(sequelize, DataTypes);
  var status = _status(sequelize, DataTypes);

  boardelement.belongsTo(board, { as: "board", foreignKey: "boardId"});
  board.hasMany(boardelement, { as: "boardelEments", foreignKey: "boardId"});
  game.belongsTo(board, { as: "board", foreignKey: "boardId"});
  board.hasMany(game, { as: "games", foreignKey: "boardId"});
  playergame.belongsTo(game, { as: "game", foreignKey: "gameId"});
  game.hasMany(playergame, { as: "playerGame", foreignKey: "gameId"});
  playergame.belongsTo(player, { as: "player", foreignKey: "playerId"});
  player.hasMany(playergame, { as: "playerGame", foreignKey: "playerId"});
  game.belongsTo(status, { as: "status", foreignKey: "statusId"});
  status.hasMany(game, { as: "games", foreignKey: "statusId"});

  return {
    board,
    boardelement,
    game,
    player,
    playergame,
    sequelizemeta,
    status,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
