import { BadRequestException, Injectable } from '@nestjs/common';
import { RecipientsRepository } from '../recipients/repositories/recipients.repository';
import { UsersRepository } from '../users/repositories/users.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersRepository } from './repositories/orders.repository';

@Injectable()
export class OrdersService {
  constructor(
    private ordersRepository: OrdersRepository,
    private recipientsRepository: RecipientsRepository,
    private usersRepository: UsersRepository,
  ) { }

  async create(currentUserId: string, data: CreateOrderDto) {
    if (data.status !== 'AGUARDANDO' && data.status !== 'ENTREGUE' && data.status !== 'DEVOLVIDA') {
      throw new BadRequestException('Status not valid. (AGUARDANDO, ENTREGUE, DEVOLVIDA)')
    }

    const findedUser = await this.usersRepository.findUniqueById(currentUserId)

    if (!findedUser) {
      throw new BadRequestException('Delivery driver not found.')
    }

    const findedRecipient = await this.recipientsRepository.findUniqueById(String(data.recipient_id))

    if (!findedRecipient) {
      throw new BadRequestException('Recipient not found.')
    }

    return await this.ordersRepository.create(currentUserId, data)
  }

  async findAll(currentUserId: string, query) {
    return await this.ordersRepository.findAll(currentUserId, query)
  }

  async findAllAdmin(query) {
    return await this.ordersRepository.findAllAdmin(query)
  }


  async findUniqueById(currentUserId: string, id: string) {
    const order = await this.ordersRepository.findUniqueById(currentUserId, id)

    if (!order) {
      throw new BadRequestException('Order not found.')
    }

    return order
  }

  async findUniqueByIdAdmin(id: string) {
    const order = await this.ordersRepository.findUniqueByIdAdmin(id)

    if (!order) {
      throw new BadRequestException('Order not found.')
    }

    return order
  }

  async findNearbyOrders(currentUserId: string) {
    return await this.ordersRepository.findNearbyOrders(currentUserId)
  }

  async update(currentUserId: string, id: string, data: UpdateOrderDto) {
    const order = await this.findUniqueById(currentUserId, id)

    if (data.status) {
      if (data.status !== 'AGUARDANDO' && data.status !== 'ENTREGUE' && data.status !== 'DEVOLVIDA') {
        throw new BadRequestException('Status not valid. (AGUARDANDO, ENTREGUE, DEVOLVIDA)')
      }
    }

    const updatedOrder = await this.ordersRepository.update(currentUserId, id, data)

    return updatedOrder
  }

  async delete(currentUserId: string, id: string) {
    const order = await this.findUniqueById(currentUserId, id)

    return this.ordersRepository.delete(currentUserId, id)
  }
}
