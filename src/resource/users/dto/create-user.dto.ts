import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @MinLength(5)
    password: string;

    @MaxLength(11)
    cpf: string;

    latitude: number;
    longitude: number;
    createdAt: Date;
}
