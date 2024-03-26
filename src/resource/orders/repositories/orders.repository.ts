import { CreateOrderDto } from "../dto/create-order.dto";
import { QueryOrderDto } from "../dto/query-order.dto";
import { UpdateOrderDto } from "../dto/update-order.dto";
import { OrderEntity } from "../entities/order.entity";

export abstract class OrdersRepository {
    abstract create(data: CreateOrderDto): Promise<void>
    abstract findAll(query: QueryOrderDto)
    abstract findUniqueById(id: string): Promise<OrderEntity>
    abstract update(id: string, dataOrder: UpdateOrderDto): Promise<OrderEntity>
    abstract delete(id: string): Promise<void>
}