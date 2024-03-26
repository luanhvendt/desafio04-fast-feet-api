import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma-service';
import { PrismaRecipientsRepository } from '../recipients/repositories/prisma/prisma-recipients.repository';
import { RecipientsRepository } from '../recipients/repositories/recipients.repository';
import { PrismaUsersRepository } from '../users/repositories/prisma/prisma-users.repository';
import { UsersRepository } from '../users/repositories/users.repository';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './repositories/orders.repository';
import { PrismaOrdersRepository } from './repositories/prisma/prisma-orders.repository';

@Module({
  controllers: [OrdersController],
  providers: [
    PrismaService,
    OrdersService,
    { provide: OrdersRepository, useClass: PrismaOrdersRepository },
    { provide: UsersRepository, useClass: PrismaUsersRepository },
    { provide: RecipientsRepository, useClass: PrismaRecipientsRepository },
  ],
})
export class OrdersModule { }
