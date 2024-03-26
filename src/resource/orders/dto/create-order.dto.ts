import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateOrderDto {
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

