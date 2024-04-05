"use strict";

const getRandomInteger = require("lodash.random");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const productIds = await queryInterface.sequelize.query(
            "SELECT id FROM products",
            { type: Sequelize.QueryTypes.SELECT }
        );

        const orderIds = await queryInterface.sequelize.query(
            "SELECT id FROM orders",
            { type: Sequelize.QueryTypes.SELECT }
        );

        const orders_products = [];

        for (let i = 0; i <= 10; i++) {
            const productIndex = getRandomInteger(0, productIds.length - 1);
            const orderIndex = getRandomInteger(0, orderIds.length - 1);

            orders_products.push({
                product_id: productIds[productIndex].id,
                order_id: orderIds[orderIndex].id,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }

        await queryInterface.bulkInsert("orders_products", orders_products, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("orders_products", null, {});
    },
};
