import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { CurrentUser } from './auth/decorators/current-user.decorator';
import { UserEntity } from './resource/users/entities/user.entity';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';

@Controller()
@UseGuards(JwtAuthGuard)
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('me')
  getMe(@CurrentUser() user: UserEntity) {
    return user
  }
}
