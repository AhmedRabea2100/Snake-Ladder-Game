const game = require('../models').game;

async function getRooms(req, res) {
  try {
    const data = await game.findAll({
      where: {
        statusId: '1',
      },
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  getRooms
};
