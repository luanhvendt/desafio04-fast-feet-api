import { CreateOrderDto } from "../dto/create-order.dto";
import { QueryOrderDto } from "../dto/query-order.dto";
import { UpdateOrderDto } from "../dto/update-order.dto";
import { OrderEntity } from "../entities/order.entity";

export abstract class OrdersRepository {
    abstract create(currentUserId: string, data: CreateOrderDto): Promise<void>
    abstract findAll(currentUserId: string, query: QueryOrderDto)
    abstract findAllAdmin(query: QueryOrderDto)
    abstract findUniqueById(currentUserId: string, id: string): Promise<OrderEntity>
    abstract findUniqueByIdAdmin(id: string): Promise<OrderEntity>
    abstract findNearbyOrders(currentUserId: string)
    abstract update(currentUserId: string, id: string, dataOrder: UpdateOrderDto): Promise<OrderEntity>
    abstract delete(currentUserId: string, id: string): Promise<void>
}