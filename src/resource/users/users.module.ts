import { Module } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { PrismaUsersRepository } from './repositories/prisma/prisma-users.repository';
import { UsersRepository } from './repositories/users.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    controllers: [UsersController],
    providers: [
        PrismaService,
        UsersService,
        PrismaUsersRepository,
        { provide: UsersRepository, useClass: PrismaUsersRepository }
    ],
})
export class UsersModule { }
