import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { User } from "./entities/user.entity";
import { RegisterUserDto } from "../../common/dtos/register-user.dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>
    ) {}

    async findOne(email: string) {
        const user = await this.usersRepository.findOne({
            where: { email },
        });

        if (!user) {
            throw new NotFoundException(`User with email: ${email} not found`);
        }

        return user;
    }

    async create(credentials: RegisterUserDto) {
        const user = this.usersRepository.create(credentials);
        await this.usersRepository.save(user);
        return user;
    }
}
