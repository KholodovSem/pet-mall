"use strict";

const { faker } = require("@faker-js/faker");
const getRandomInteger = require("lodash.random");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const manufacturerIds = await queryInterface.sequelize.query(
            "SELECT id FROM manufacturers",
            { type: Sequelize.QueryTypes.SELECT }
        );

        const purposeIds = await queryInterface.sequelize.query(
            "SELECT id FROM purposes",
            {
                type: Sequelize.QueryTypes.SELECT,
            }
        );

        const products = [];

        for (let i = 0; i <= 10; i++) {
            const manufacturerIndex = getRandomInteger(
                0,
                manufacturerIds.length - 1
            );

            const purposeIndex = getRandomInteger(0, purposeIds.length - 1);

            products.push({
                name: faker.commerce.product(),
                price: faker.number.int({ min: 1, max: 5 }),
                quantity: faker.number.int({ min: 1, max: 10 }),
                image: faker.image.url(),
                manufacturer_id: manufacturerIds[manufacturerIndex].id,
                purpose_id: purposeIds[purposeIndex].id,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }

        await queryInterface.bulkInsert("products", products);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("products", null, {});
    },
};
