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

  async create(data: CreateOrderDto) {
    if (!data.delivery_id) {
      throw new BadRequestException('Delivery_id is required.')
    }

    if (!data.recipient_id) {
      throw new BadRequestException('Recipient_id is required.')
    }

    if (!data.status) {
      throw new BadRequestException('Status is required.')
    }

    if (!data.latitude) {
      throw new BadRequestException('Latitude is required.')
    }

    if (!data.longitude) {
      throw new BadRequestException('Longitude is required.')
    }

    if (data.status !== 'AGUARDANDO' && data.status !== 'ENTREGUE' && data.status !== 'DEVOLVIDA') {
      throw new BadRequestException('Status not valid. (AGUARDANDO, ENTREGUE, DEVOLVIDA)')
    }

    const findedUser = await this.usersRepository.findUniqueById(String(data.delivery_id))

    if (!findedUser) {
      throw new BadRequestException('Delivery driver not found.')
    }

    const findedRecipient = await this.recipientsRepository.findUniqueById(String(data.recipient_id))

    if (!findedRecipient) {
      throw new BadRequestException('Recipient not found.')
    }

    return await this.ordersRepository.create(data)
  }

  async findAll(query) {
    return await this.ordersRepository.findAll(query)
  }

  async findUniqueById(id: string) {
    const order = await this.ordersRepository.findUniqueById(id)

    if (!order) {
      throw new BadRequestException('Order not found.')
    }

    return order
  }

  async update(id: string, data: UpdateOrderDto) {
    const order = await this.findUniqueById(id)

    if (data.status) {
      if (data.status !== 'AGUARDANDO' && data.status !== 'ENTREGUE' && data.status !== 'DEVOLVIDA') {
        throw new BadRequestException('Status not valid. (AGUARDANDO, ENTREGUE, DEVOLVIDA)')
      }
    }

    const updatedOrder = await this.ordersRepository.update(id, data)

    return updatedOrder
  }

  async delete(id: string) {
    const order = await this.findUniqueById(id)

    return this.ordersRepository.delete(id)
  }
}
