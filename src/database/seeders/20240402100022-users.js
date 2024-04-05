"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("users", [
            {
                email: "test@gmail.com",
                password: "12345qwert",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                email: "super_test@gmail.com",
                password: "12345qwert",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                email: "ultra_super_test@gmail.com",
                password: "12345qwert",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete("users", null, {});
    },
};
