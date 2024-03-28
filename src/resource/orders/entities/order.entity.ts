export class OrderEntity {
    id: number
    delivery_id: number
    recipient_id: number
    status: 'AGUARDANDO' | 'ENTREGUE' | 'DEVOLVIDA' | 'RETIRADA'
    latitude: number
    longitude: number
    photo?: string
    createdAt: Date
    updatedAt?: Date
    deletedAt?: Date
}
