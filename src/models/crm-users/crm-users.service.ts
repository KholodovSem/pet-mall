import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CrmUser } from "./entities/crm-user.entity";
import { RegisterUserDto } from "../../common/dtos/register-user.dto";

@Injectable()
export class CrmUsersService {
    constructor(
        @InjectRepository(CrmUser)
        private readonly crmUsersRepository: Repository<CrmUser>
    ) {}

    async findOne(email: string) {
        const crmUser = await this.crmUsersRepository.findOne({
            where: { email },
        });

        if (!crmUser) {
            throw new NotFoundException(`User with email: ${email} not found`);
        }

        return crmUser;
    }

    async create(credentials: RegisterUserDto) {
        const crmUser = this.crmUsersRepository.create(credentials);
        await this.crmUsersRepository.save(crmUser);
        return crmUser;
    }
}

//   const isPasswordMatch = await bcrypt.compare(password, crmUser.password);

//   if (!isPasswordMatch) {
//       throw new BadRequestException("Invalid email address or password");
//   }

//   return { token: "" };
