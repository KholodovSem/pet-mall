import { Handler } from "express";
import { Op } from "sequelize";
import bcrypt from "bcrypt";

import { CRMUser, Role, UserRole } from "../../../../../database/models";
import { BadRequestError } from "../../../../utils";
import { PossibleRole } from "../../../../../common/constants";

export const register: Handler = async (req, res) => {
    const { email, password } = req.body;

    const isCrmUserExist = await CRMUser.findOne({
        where: {
            email: {
                [Op.eq]: email,
            },
        },
    });

    if (isCrmUserExist) {
        throw new BadRequestError(`User with email: ${email} already exist`);
    }

    const role = await Role.findOne({
        where: {
            name: {
                [Op.eq]: PossibleRole.MANAGER,
            },
        },
    });

    if (!role) {
        return res
            .status(502)
            .json({ message: "There is no such role in the database" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await CRMUser.create({ email, password: hashedPassword });

    await UserRole.create({ user_id: user.id, role_id: role.id });

    res.status(201).json({ message: "User successfully created" });
};
