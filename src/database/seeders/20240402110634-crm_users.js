"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("crm_users", [
            {
                email: "admin@gmail.com",
                password: "12345admin",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                email: "manager@gmail.com",
                password: "12345manager",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete("crm_users", null, {});
    },
};
