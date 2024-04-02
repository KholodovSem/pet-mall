"use strict";

const { Op } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const adminRoleId = await queryInterface.rawSelect(
            "roles",
            {
                where: {
                    name: "admin",
                },
            },
            ["id"]
        );

        const managerRoleId = await queryInterface.rawSelect(
            "roles",
            {
                where: {
                    name: "manager",
                },
            },
            ["id"]
        );

        const adminUserId = await queryInterface.rawSelect(
            "crm_users",
            {
                where: {
                    email: {
                        [Op.like]: `%admin%`,
                    },
                },
            },
            ["id"]
        );

        const managerUserId = await queryInterface.rawSelect(
            "crm_users",
            {
                where: {
                    email: {
                        [Op.like]: `%manager%`,
                    },
                },
            },
            ["id"]
        );

        await queryInterface.bulkInsert("users_roles", [
            {
                user_id: adminUserId,
                role_id: adminRoleId,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                user_id: managerUserId,
                role_id: managerRoleId,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("users_roles", null, {});
    },
};
