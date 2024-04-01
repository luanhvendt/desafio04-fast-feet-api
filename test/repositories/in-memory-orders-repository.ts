import { CreateOrderDto } from "../../src/resource/orders/dto/create-order.dto";
import { QueryOrderDto } from "../../src/resource/orders/dto/query-order.dto";
import { UpdateOrderDto } from "../../src/resource/orders/dto/update-order.dto";
import { OrderEntity } from "../../src/resource/orders/entities/order.entity";
import { OrdersRepository } from "../../src/resource/orders/repositories/orders.repository";
import { getDistanceBetweenCoordinates } from "../../src/utils/get-distance-between-cordinates";

let id = 1

export class InMemoryOrdersRepository implements OrdersRepository {
    public items: any = []

    async create(currentUserId: string, data: CreateOrderDto): Promise<void> {
        const order = {
            id: data.id || id,
            delivery_id: parseInt(currentUserId),
            recipient_id: data.recipient_id,
            status: data.status,
            latitude: data.latitude,
            longitude: data.longitude,
            phto: data.photo,
            createdAt: new Date()
        }

        id += 1
        this.items.push(order)
    }

    async findAll() {
        return this.items
    }

    async findUniqueById(currentUserId: string, id: string): Promise<OrderEntity> {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id === parseInt(id) && this.items[i].delivery_id === parseInt(currentUserId)) {
                return this.items[i]
            }
        }
    }

    async findNearbyOrders(currentUserId: string) {
        const user = {
            id: id,
            name: 'name',
            type: 'ENTREGADOR',
            email: 'email@mail.com',
            password: '12345',
            cpf: '11111111111',
            latitude: 100,
            longitude: 100,
            createdAt: new Date(),
        }

        let orders = []

        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].delivery_id === parseInt(currentUserId)) {
                orders.push(this.items[i])
            }
        }

        const MAX_DISTANCE_IN_KILOMETERS = 2

        const nearbyOrders = orders.filter((order) => {
            const distance = getDistanceBetweenCoordinates(
                { latitude: user.latitude, longitude: user.longitude },
                { latitude: order.latitude, longitude: order.longitude }
            )

            return distance <= MAX_DISTANCE_IN_KILOMETERS
        })

        return nearbyOrders
    }

    async update(currentUserId: string, id: string, dataOrder: UpdateOrderDto): Promise<OrderEntity> {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id === parseInt(id) && this.items[i].delivery_id === parseInt(currentUserId)) {
                this.items[i].recipient_id = dataOrder.recipient_id,
                    this.items[i].status = dataOrder.status,
                    this.items[i].latitude = dataOrder.latitude,
                    this.items[i].longitude = dataOrder.longitude,
                    this.items[i].photo = dataOrder.photo,
                    this.items[i].updatedAt = new Date()

                return this.items[i]
            }
        }
    }

    async delete(currentUserId: string, id: string): Promise<void> {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id === parseInt(id) && this.items[i].delivery_id === parseInt(currentUserId)) {
                this.items.splice(i, 1);
            }
        }
    }

    findAllAdmin(query: QueryOrderDto) { }

    async findUniqueByIdAdmin(id: string): Promise<OrderEntity> {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id === parseInt(id) && this.items[i].id === parseInt(id)) {
                return this.items[i]
            }
        }
    }
}