"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const manufacturers = [
            "4 paws",
            "royal canin",
            "purina",
            "brit",
            "savory",
            "optimeal",
        ];

        await queryInterface.bulkInsert(
            "manufacturers",
            manufacturers.map((manufacturerName) => ({
                name: manufacturerName,
                createdAt: new Date(),
                updatedAt: new Date(),
            }))
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("manufacturers", null, {});
    },
};
