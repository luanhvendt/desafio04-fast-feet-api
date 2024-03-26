import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { RecipientsController } from './recipients.controller';
import { RecipientsService } from './recipients.service';
import { PrismaRecipientsRepository } from './repositories/prisma/prisma-recipients.repository';
import { RecipientsRepository } from './repositories/recipients.repository';

@Module({
  controllers: [RecipientsController],
  providers: [
    PrismaService,
    RecipientsService,
    { provide: RecipientsRepository, useClass: PrismaRecipientsRepository }
  ],
})
export class RecipientsModule { }
