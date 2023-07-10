'use strict';

const { Sequelize } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('status', [
      { id: 1, value: 'Pending' },
      { id: 2, value: 'Running' },
      { id: 3, value: 'Finished' },
    ]);

    const boardData = [{ id: 1, image: 'https://drive.google.com/file/d/1k_87giaL8LtPfz6tjH4TLhMAGte1I1bT/view?usp=sharing' }];
    await queryInterface.bulkInsert('board', boardData);

    // const elementData = ;
    await queryInterface.bulkInsert('boardelement', [
      {id: 1, from: 4, to: 25,  boardId: 1},
      {id: 2, from: 21, to: 39, boardId: 1},
      {id: 3, from: 29, to: 74, boardId: 1},
      {id: 4, from: 43, to: 76, boardId: 1},
      {id: 5, from: 63, to: 80, boardId: 1},
      {id: 6, from: 71, to: 89, boardId: 1},
      {id: 7, from: 30, to: 7,  boardId: 1},
      {id: 8, from: 47, to: 15, boardId: 1},
      {id: 9, from: 56, to: 19, boardId: 1},
      {id: 10, from: 82, to: 42, boardId: 1},
      {id: 11, from: 73, to: 51, boardId: 1},
      {id: 12, from: 98, to: 55, boardId: 1},
      {id: 13, from: 92, to: 75, boardId: 1},
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('boardelement', null, {});
    await queryInterface.bulkDelete('board', null, {});
    await queryInterface.bulkDelete('status', null, {});
  },
};
