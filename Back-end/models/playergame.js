const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('playergame', {
    playerId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'player',
        key: 'id'
      }
    },
    gameId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'game',
        key: 'id'
      }
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'playergame',
    timestamps: true,
    indexes: [
      {
        name: "playerId",
        using: "BTREE",
        fields: [
          { name: "playerId" },
        ]
      },
      {
        name: "gameId",
        using: "BTREE",
        fields: [
          { name: "gameId" },
        ]
      },
    ]
  });
};
