import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
    delivery_id?: number;
    recipient_id?: number;
    status?: 'AGUARDANDO' | 'ENTREGUE' | 'DEVOLVIDA';
    latitude?: number;
    longitude?: number;
    photo?: string;
    updatedAt: Date;
}
