import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './resource/users/users.module';
import { OrdersModule } from './resource/orders/orders.module';
import { RecipientsModule } from './resource/recipients/recipients.module';

@Module({
  imports: [UsersModule, OrdersModule, RecipientsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
