'use strict';

const { FRIEND_ACCEPTED, FRIEND_PENDING } = require('../config/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    return queryInterface.bulkInsert('friends', [
      {
        status: FRIEND_ACCEPTED,
        created_at: new Date(),
        updated_at: new Date(),
        requester_id: 1,
        accepter_id: 2
      },
      {
        status: FRIEND_ACCEPTED,
        created_at: new Date(),
        updated_at: new Date(),
        requester_id: 6,
        accepter_id: 5
      },
      {
        status: FRIEND_ACCEPTED,
        created_at: new Date(),
        updated_at: new Date(),
        requester_id: 6,
        accepter_id: 1
      },
      {
        status: FRIEND_ACCEPTED,
        created_at: new Date(),
        updated_at: new Date(),
        requester_id: 5,
        accepter_id: 7
      },
      {
        status: FRIEND_ACCEPTED,
        created_at: new Date(),
        updated_at: new Date(),
        requester_id: 2,
        accepter_id: 5
      },
      {
        status: FRIEND_PENDING,
        created_at: new Date(),
        updated_at: new Date(),
        requester_id: 1,
        accepter_id: 7
      },
      {
        status: FRIEND_PENDING,
        created_at: new Date(),
        updated_at: new Date(),
        requester_id: 5,
        accepter_id: 2
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('friends', null, {});
  }
};
