"use strict";

const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const products = [];

        for (let i = 0; i <= 10; i++) {
            products.push({
                name: faker.commerce.product(),
                price: faker.number.int({ min: 1, max: 1000 }),
                quantity: faker.number.int({ min: 1, max: 10 }),
                image: faker.image.url(),
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
