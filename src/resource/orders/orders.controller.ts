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

  @Get()
  async findAll(@CurrentUser() currentUser: UserEntity, @Query() query: QueryOrderDto) {
    if (currentUser.type !== 'ADMIN') {
      throw new UnauthorizedException('Usuário não autorizado.')
    }

    return this.ordersService.findAll(query);
  }

  @Get(':id')
  async findUnique(@CurrentUser() currentUser: UserEntity, @Param('id') id: string) {
    if (currentUser.type !== 'ADMIN') {
      throw new UnauthorizedException('Usuário não autorizado.')
    }

    return this.ordersService.findUniqueById(id);
  }

  @Put(':id')
  async update(@CurrentUser() currentUser, @Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    if (currentUser.type !== 'ADMIN') {
      throw new UnauthorizedException('Usuário não autorizado.')
    }

    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  async delete(@CurrentUser() currentUser, @Param('id') id: string) {
    if (currentUser.type !== 'ADMIN') {
      throw new UnauthorizedException('Usuário não autorizado.')
    }

    return this.ordersService.delete(id);
  }
}
