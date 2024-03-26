export class QueryOrderDto {
    page?: number;
    limit?: number;
    search?: string;
    delivery_id?: number;
    recipient_id?: number;
    status?: 'AGUARDANDO' | 'ENTREGUE' | 'DEVOLVIDA';
    latitude?: number;
    longitude?: number;
}