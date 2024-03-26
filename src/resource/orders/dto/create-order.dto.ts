export class CreateOrderDto {
    delivery_id: number;
    recipient_id: number;
    status: 'AGUARDANDO' | 'ENTREGUE' | 'DEVOLVIDA';
    latitude: number;
    longitude: number;
    photo?: string;
    createdAt: Date;
}
