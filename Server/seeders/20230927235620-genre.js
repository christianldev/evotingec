'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('genres', [
      {
        genreId: 1,
        name: 'Masculino'
      },
      {
        genreId: 2,
        name: 'Femenino'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('genres', null, {})
  }
};
