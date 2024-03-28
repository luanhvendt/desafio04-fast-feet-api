import { IsEmail, IsOptional, IsString } from "class-validator";

export class CreateRecipientDto {
    @IsOptional()
    id?: number;

    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsOptional()
    createdAt?: Date;
}
