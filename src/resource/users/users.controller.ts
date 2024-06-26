import { Body, Controller, Delete, Get, Param, Post, Put, Query, UnauthorizedException, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async findAll(@CurrentUser() currentUser, @Query() query: QueryUserDto) {
        if (currentUser.type !== 'ADMIN') {
            throw new UnauthorizedException('Usuário não autorizado.')
        }

        return this.usersService.findAll(query);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async findUnique(@CurrentUser() currentUser, @Param('id') id: string) {
        if (String(currentUser.id) !== id && currentUser.type !== 'ADMIN') {
            throw new UnauthorizedException('Usuário não autorizado.')
        }

        return this.usersService.findUnique(id);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    async update(@CurrentUser() currentUser: UserEntity, @Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        if (String(currentUser.id) !== id && currentUser.type !== 'ADMIN') {
            throw new UnauthorizedException('Usuário não autorizado.')
        }

        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async delete(@CurrentUser() currentUser: UserEntity, @Param('id') id: string) {
        if (String(currentUser.id) !== id && currentUser.type !== 'ADMIN') {
            throw new UnauthorizedException('Usuário não autorizado.')
        }

        return this.usersService.delete(id);
    }
}
