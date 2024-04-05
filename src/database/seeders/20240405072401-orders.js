"use strict";

const getRandomInteger = require("lodash.random");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const userIds = await queryInterface.sequelize.query(
            "SELECT id FROM users",
            { type: Sequelize.QueryTypes.SELECT }
        );

        const orders = [];

        for (let i = 0; i <= 10; i++) {
            const userIndex = getRandomInteger(0, userIds.length - 1);

            orders.push({
                user_id: userIds[userIndex].id,
                status: "pending",
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }

        await queryInterface.bulkInsert("orders", orders, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("orders", null, {});
    },
};
