import { IsEmail, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsOptional()
    id?: number

    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @MinLength(5)
    password: string;

    @MaxLength(11)
    @IsString()
    cpf: string;

    @IsNumber()
    latitude: number;

    @IsNumber()
    longitude: number;
    createdAt: Date;
}
