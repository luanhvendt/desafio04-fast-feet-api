import { Body, Controller, Delete, Get, Param, Post, Put, Query, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    async findAll(@CurrentUser() currentUser, @Query() query: QueryUserDto) {
        if (currentUser.type !== 'ADMIN') {
            throw new UnauthorizedException('Usuário não autorizado.')
        }

        return this.usersService.findAll(query);
    }

    @Get(':id')
    async findUnique(@CurrentUser() currentUser, @Param('id') id: string) {
        if (String(currentUser.id) !== id) {
            throw new UnauthorizedException('Usuário não autorizado.')
        }

        return this.usersService.findUnique(id);
    }

    @Put(':id')
    async update(@CurrentUser() currentUser: UserEntity, @Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        if (String(currentUser.id) !== id) {
            throw new UnauthorizedException('Usuário não autorizado.')
        }

        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    async delete(@CurrentUser() currentUser: UserEntity, @Param('id') id: string) {
        if (String(currentUser.id) !== id) {
            throw new UnauthorizedException('Usuário não autorizado.')
        }

        return this.usersService.delete(id);
    }
}
