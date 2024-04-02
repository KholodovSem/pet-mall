"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const tagIds = await queryInterface.sequelize.query(
            "SELECT id FROM tags",
            { type: Sequelize.QueryTypes.SELECT }
        );

        const productIds = await queryInterface.sequelize.query(
            "SELECT id FROM products",
            {
                type: Sequelize.QueryTypes.SELECT,
            }
        );

        const products_tags = productIds.map(({ id: productId }) => {
            const tagIndex = Math.floor(Math.random() * tagIds.length);

            return {
                product_id: productId,
                tag_id: tagIds[tagIndex].id,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
        });

        await queryInterface.bulkInsert("products_tags", products_tags, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("products_tags", null, {});
    },
};
