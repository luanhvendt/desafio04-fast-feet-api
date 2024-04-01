import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateOrderDto {
    @IsOptional()
    id?: number

    @IsNumber()
    recipient_id: number;

    @IsNotEmpty()
    status: 'AGUARDANDO' | 'ENTREGUE' | 'DEVOLVIDA';

    @IsNumber()
    latitude: number;
    @IsNumber()
    longitude: number;
    photo?: string;
    createdAt: Date;
}

