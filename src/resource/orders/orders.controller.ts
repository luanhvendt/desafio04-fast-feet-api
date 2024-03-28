import { Body, Controller, Delete, Get, Param, Post, Put, Query, UnauthorizedException, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { UserEntity } from '../users/entities/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { QueryOrderDto } from './dto/query-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post()
  async create(@CurrentUser() currentUser: UserEntity, @Body() createOrderDto: CreateOrderDto) {
    if (currentUser.type !== 'ADMIN') {
      throw new UnauthorizedException('Usuário não autorizado.')
    }
    return this.ordersService.create(String(currentUser.id), createOrderDto);
  }

  @Get('nearbyOrders')
  async findNearbyOrders(@CurrentUser() currentUser: UserEntity) {

    return this.ordersService.findNearbyOrders(String(currentUser.id))
  }

  @Get()
  async findAll(@CurrentUser() currentUser: UserEntity, @Query() query: QueryOrderDto) {
    if (currentUser.type === 'ADMIN') {
      return this.ordersService.findAllAdmin(query);
    }

    return this.ordersService.findAll(String(currentUser.id), query);
  }

  @Get(':id')
  async findUnique(@CurrentUser() currentUser: UserEntity, @Param('id') id: string) {
    if (currentUser.type === 'ADMIN') {
      return this.ordersService.findUniqueByIdAdmin(id)
    }

    return this.ordersService.findUniqueById(String(currentUser.id), id);
  }


  @Put(':id')
  async update(@CurrentUser() currentUser, @Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    if (currentUser.type !== 'ADMIN') {
      throw new UnauthorizedException('Usuário não autorizado.')
    }


    return this.ordersService.update(String(currentUser.id), id, updateOrderDto);
  }

  @Delete(':id')
  async delete(@CurrentUser() currentUser, @Param('id') id: string) {
    if (currentUser.type !== 'ADMIN') {
      throw new UnauthorizedException('Usuário não autorizado.')
    }

    return this.ordersService.delete(String(currentUser.id), id);
  }
}
