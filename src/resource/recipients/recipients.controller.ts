import { Body, Controller, Delete, Get, Param, Post, Put, Query, UnauthorizedException, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { UserEntity } from '../users/entities/user.entity';
import { CreateRecipientDto } from './dto/create-recipient.dto';
import { QueryRecipientDto } from './dto/query-recipient.dto';
import { UpdateRecipientDto } from './dto/update-recipient.dto';
import { RecipientsService } from './recipients.service';

@Controller('recipients')
@UseGuards(JwtAuthGuard)
export class RecipientsController {
  constructor(private readonly recipientsService: RecipientsService) { }

  @Post()
  async create(@CurrentUser() currentUser: UserEntity, @Body() createRecipientDto: CreateRecipientDto) {
    if (currentUser.type !== 'ADMIN') {
      throw new UnauthorizedException('Usuário não autorizado.')
    }

    return this.recipientsService.create(createRecipientDto);
  }

  @Get()
  async findAll(@CurrentUser() currentUser: UserEntity, @Query() query: QueryRecipientDto) {
    if (currentUser.type !== 'ADMIN') {
      throw new UnauthorizedException('Usuário não autorizado.')
    }

    return this.recipientsService.findAll(query);
  }

  @Get('notification/:id')
  async findNotifications(@Param('id') id: string) {
    return this.recipientsService.findNotifications(id)
  }

  @Get('email/:email')
  async findUniqueByEmail(@CurrentUser() currentUser: UserEntity, @Param('email') email: string) {
    if (currentUser.type !== 'ADMIN') {
      throw new UnauthorizedException('Usuário não autorizado.')
    }

    return this.recipientsService.findUniqueByEmail(email);
  }

  @Get(':id')
  async findUniqueById(@CurrentUser() currentUser: UserEntity, @Param('id') id: string) {
    if (currentUser.type !== 'ADMIN') {
      throw new UnauthorizedException('Usuário não autorizado.')
    }

    return this.recipientsService.findUniqueById(id);
  }

  @Put(':id')
  async update(@CurrentUser() currentUser: UserEntity, @Param('id') id: string, @Body() updateRecipientDto: UpdateRecipientDto) {
    if (currentUser.type !== 'ADMIN') {
      throw new UnauthorizedException('Usuário não autorizado.')
    }

    return this.recipientsService.update(id, updateRecipientDto);
  }

  @Delete(':id')
  async delete(@CurrentUser() currentUser: UserEntity, @Param('id') id: string) {
    if (currentUser.type !== 'ADMIN') {
      throw new UnauthorizedException('Usuário não autorizado.')
    }

    return this.recipientsService.delete(id);
  }
}
