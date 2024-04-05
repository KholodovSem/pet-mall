"use strict";

const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const hashedPassword = await bcrypt.hash("12345qwert", 10);

        await queryInterface.bulkInsert("crm_users", [
            {
                email: "admin@gmail.com",
                password: hashedPassword,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                email: "manager@gmail.com",
                password: hashedPassword,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete("crm_users", null, {});
    },
};
