"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const roles = ["admin", "manager"];

        await queryInterface.bulkInsert(
            "roles",
            roles.map((roleName) => ({
                name: roleName,
                createdAt: new Date(),
                updatedAt: new Date(),
            }))
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("roles", null, {});
    },
};
