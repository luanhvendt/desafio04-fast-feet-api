import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './resource/orders/orders.module';
import { RecipientsModule } from './resource/recipients/recipients.module';
import { UsersModule } from './resource/users/users.module';

@Module({
  imports: [UsersModule, OrdersModule, RecipientsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
