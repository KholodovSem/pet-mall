"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const purposes = ["cats", "dogs", "birds"];

        await queryInterface.bulkInsert(
            "purposes",
            purposes.map((purposeName) => ({
                name: purposeName,
                createdAt: new Date(),
                updatedAt: new Date(),
            }))
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("purposes", null, {});
    },
};
