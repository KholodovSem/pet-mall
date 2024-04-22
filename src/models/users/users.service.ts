import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";

import { User } from "./entities/user.entity";
import { LoginUserDto } from "../../common/dtos/login-user.dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>
    ) {}

    async findOne({ email, password }: LoginUserDto) {
        const user = await this.usersRepository.findOne({
            where: { email },
        });

        if (!user) {
            throw new NotFoundException(`User with email: ${email} not found`);
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            throw new BadRequestException("Invalid email address or password");
        }

        return { token: "" };
    }

    async create() {
        const payload = { id: "", roles: [""] };
    }
}
