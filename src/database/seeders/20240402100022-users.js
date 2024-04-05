"use strict";

const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const hashedPassword = await bcrypt.hash("12345qwert", 10);

        await queryInterface.bulkInsert("users", [
            {
                email: "test@gmail.com",
                password: hashedPassword,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                email: "super_test@gmail.com",
                password: hashedPassword,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                email: "ultra_super_test@gmail.com",
                password: hashedPassword,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete("users", null, {});
    },
};
