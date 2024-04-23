import { IsEmail, IsNotEmpty } from "class-validator";

export class RegisterUserDto {
    @IsNotEmpty()
    @IsEmail()
    readonly email!: string;

    @IsNotEmpty()
    readonly password!: string;
}
