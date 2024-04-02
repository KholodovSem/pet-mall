"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const tags = ["health", "clothes", "food"];

        await queryInterface.bulkInsert(
            "tags",
            tags.map((tagName) => ({
                name: tagName,
                createdAt: new Date(),
                updatedAt: new Date(),
            }))
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("People", null, {});
    },
};
